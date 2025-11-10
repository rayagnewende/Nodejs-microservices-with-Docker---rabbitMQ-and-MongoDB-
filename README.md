# Task Management Microservices Application

This repository contains a **task management application** built using a **microservices architecture**.  
It demonstrates service decoupling, asynchronous communication through messaging, containerization, and continuous integration principles.

##  Architecture Overview

The system is divided into several microservices, each responsible for a specific domain:

| Service | Description | Technologies |
|--------|-------------|--------------|
| **User Service** | Manages user accounts and authentication | Node.js, Express, MongoDB, JWT |
| **Task Service** | Handles creation, updates, assignment and completion of tasks | Node.js, Express, MongoDB |
| **Notification Service** | Sends notifications (email/SMS/queue-based) based on system events | Node.js, RabbitMQ |
| **Message Broker** | Enables asynchronous communication between services | RabbitMQ |
| **Database** | Stores persistent data for each service | MongoDB (One DB per service) |

The architecture promotes **loose coupling**, **scalability**, and **service autonomy**.

---

##  Technologies Used

- **Node.js** & **Express.js** for backend service development
- **MongoDB** with Mongoose ORM for data persistence
- **RabbitMQ** for message queue communication
- **Docker** & **Docker Compose** for containerization and orchestration

---

## 🚀 Getting Started

### **Prerequisites**
Make sure you have the following installed:

| Tool | Version |
|------|---------|
| Node.js | >= 18.x |
| Docker | >= 20.x |
| Docker Compose | >= 2.x |

### **Clone the Repository**
```bash
git clone https://github.com/rayagnewende/Nodejs-microservices-with-Docker---rabbitMQ-and-MongoDB-.git
cd Nodejs-microservices-with-Docker---rabbitMQ-and-MongoDB-

### **Start the Application**

The entire environment is orchestrated using Docker Compose:

docker compose up --build -d 

 **This will start**

All microservices

All MongoDB databases

RabbitMQ server & management UI (accessible on :15672)

## Author
## Your : R KABORE**
# LinkedIhttps://www.linkedin.com/in/yourprofile](https://www.linkedin.com/in/kaborerayagnewendeevariste/)
## GitHub: https://github.com/rayagnewende*
