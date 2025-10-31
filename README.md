# 🎓 Todo-app-with-notes

A simple full-stack web application built using **Node.js**, **Express**, and **vanilla HTML, CSS, and JavaScript**.  
The backend serves both REST APIs and static frontend content from the `public/` folder.  
The application is fully containerized using **Docker** and **Docker Compose** for easy setup and deployment.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express |
| Database | JSON-based local file (`db.json`) |
| Containerization | Docker, Docker Compose |

---

## 📁 Project Structure

Projects-web-dev-main/
│── public/ # Static frontend files
│── server.js # Express server
│── db.json # Local JSON mock database
│── package.json # Node.js dependencies
│── package-lock.json
│── Dockerfile # Docker build configuration
│── docker-compose.yml # Docker Compose orchestration
│── README.md # Documentation



---

## ⚙️ Prerequisites

Make sure you have installed:

- [Node.js (v18+)](https://nodejs.org/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Running the App (Without Docker)

```bash
# Install dependencies
npm install

# Start the server
node server.js

🐳 Running the App with Docker
🧩 1. Build the Docker Image
docker build -t school-web-app .

🧩 2. Run the Container
docker run -d -p 5000:5000 --name school_container school-web-app

🧩 3. View Running Containers
docker ps

🧩 4. Check Container Logs
docker logs school_container

🧩 5. Stop the Container
docker stop school_container

🧩 6. Remove the Container
docker rm school_container

🧩 7. Remove the Image
docker rmi school-web-app

⚙️ Using Docker Compose (Recommended for Multi-Service Setup)
🧩 1. Build and Start Containers
docker-compose up --build

🧩 2. Run in Detached Mode
docker-compose up -d

🧩 3. View Running Services
docker-compose ps

🧩 4. View Logs
docker-compose logs -f

🧩 5. Stop and Remove Containers
docker-compose down

🧩 6. Rebuild Containers Without Cache
docker-compose build --no-cache
