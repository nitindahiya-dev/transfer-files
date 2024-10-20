# Use the official Rust image as the base
FROM rust:1.60

# Set the working directory inside the container
WORKDIR /app

# Copy the Cargo.toml and Cargo.lock files to build dependencies
COPY Cargo.toml Cargo.lock ./

# Build the dependencies to cache them
RUN cargo build --release

# Copy the source code and build it
COPY . .
RUN cargo build --release

# Expose the port your Rust server is running on (adjust if necessary)
EXPOSE 8080

# Run the compiled Rust binary
CMD ["./target/release/backend"]  # Make sure the backend binary name matches this
