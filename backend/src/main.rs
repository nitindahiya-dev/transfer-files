use actix_files::NamedFile;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use std::path::PathBuf;
use actix_multipart::Multipart;
use futures_util::{StreamExt, TryStreamExt};
use std::fs::File;
use std::io::Write;
use uuid::Uuid;
use actix_cors::Cors;


// Endpoint to handle file uploads
async fn upload_file(mut payload: Multipart) -> impl Responder {
    let upload_dir = "./uploads/";
    std::fs::create_dir_all(upload_dir).unwrap();

    while let Some(mut field) = payload.try_next().await.unwrap() {
        let file_name = Uuid::new_v4().to_string();
        let file_path = format!("{}{}", upload_dir, file_name);
        let mut file = File::create(file_path.clone()).unwrap();

        while let Some(chunk) = field.next().await {
            let data = chunk.unwrap();
            file.write_all(&data).unwrap();
        }

        return format!("File uploaded! Access it at /download/{}", file_name);
    }

    "No file uploaded".to_string()
}

// Endpoint to download the file
async fn download_file(file_id: web::Path<String>) -> actix_web::Result<NamedFile> {
    let file_path: PathBuf = format!("./uploads/{}", file_id).into();

    // If the file exists, return it
    if file_path.exists() {
        Ok(NamedFile::open(file_path)?)
    } else {
        // If the file doesn't exist, return a 404 error
        Err(actix_web::error::ErrorNotFound("File not found"))
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::default().allowed_origin("http://localhost:3000") // Allow your frontend origin
                .allowed_methods(vec!["GET", "POST"])
                .allowed_headers(vec![actix_web::http::header::CONTENT_TYPE])
                .max_age(3600)) // Optional: cache preflight requests for an hour
            .route("/upload", web::post().to(upload_file))
            .route("/download/{file_id}", web::get().to(download_file))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
