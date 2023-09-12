# Getting Started

Enter container shell `docker exec -it CONTAINER sh`

## Building & Running Dockerfile

Build the image `docker build -t [frontend,backend]:latest .`
Run the image `docker run -it --rm -p 80:80 [frontend,backend]:latest`

## Running Tests

### Frontend
...

### Backend
cd into src folder and run mocha from terminal