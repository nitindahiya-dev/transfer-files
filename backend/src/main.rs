use actix_files::NamedFile;
use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_multipart::Multipart;
use futures_util::{StreamExt, TryStreamExt};
use std::fs::{File, create_dir_all};
use std::io::Write;
use std::path::PathBuf;
use uuid::Uuid;
use actix_cors::Cors;
use dotenv::dotenv;
use sqlx::PgPool;

// Function to handle file uploads
async fn upload_file(mut payload: Multipart, pool: web::Data<PgPool>) -> impl Responder {
    let upload_dir = "./uploads/";
    create_dir_all(upload_dir).unwrap(); // Create the uploads directory if it doesn't exist

    // Iterate over the uploaded files
    while let Some(mut field) = payload.try_next().await.unwrap() {
        let file_name = Uuid::new_v4().to_string(); // Generate a unique file name
        let file_path = format!("{}{}", upload_dir, file_name); // Set the file path
        let mut file = File::create(&file_path).unwrap(); // Create the file

        // Write file chunks
        while let Some(chunk) = field.next().await {
            let data = chunk.unwrap();
            file.write_all(&data).unwrap();
        }

        // Save the file information to the database
        let query = sqlx::query("INSERT INTO uploaded_files (file_id, file_path) VALUES ($1, $2)")
            .bind(&file_name)
            .bind(&file_path);

        match query.execute(pool.get_ref()).await {
            Ok(_) => {
                // Return success message with the download URL
                return HttpResponse::Ok().json(format!("File uploaded! Access it at /download/{}", file_name));
            }
            Err(err) => {
                return HttpResponse::InternalServerError().json(format!("Failed to save file info in database: {}", err));
            }
        }
    }

    // If no file was uploaded
    HttpResponse::BadRequest().json("No file uploaded")
}

// Endpoint to download the file by file ID
async fn download_file(file_id: web::Path<String>) -> actix_web::Result<NamedFile> {
    let file_path: PathBuf = format!("./uploads/{}", file_id).into(); // Get the file path

    // If the file exists, return it
    if file_path.exists() {
        Ok(NamedFile::open(file_path)?) // Serve the file using NamedFile
    } else {
        // If the file doesn't exist, return a 404 error
        Err(actix_web::error::ErrorNotFound("File not found"))
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok(); // Load environment variables from .env file

    // Create a PostgreSQL connection pool
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPool::connect(&database_url).await.unwrap();

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone())) // Share the database pool
            .wrap(
                Cors::default()
                    .allowed_origin("http://localhost:3000") // Allow frontend origin
                    .allowed_methods(vec!["GET", "POST"]) // Allow GET and POST requests
                    .allowed_headers(vec![actix_web::http::header::CONTENT_TYPE]) // Allow Content-Type header
                    .max_age(3600), // Optional: Cache preflight requests for an hour
            )
            .route("/upload", web::post().to(upload_file)) // Handle file uploads
            .route("/download/{file_id}", web::get().to(download_file)) // Handle file downloads
    })
    .bind("127.0.0.1:8080")? // Bind the server to localhost:8080
    .run()
    .await
}
