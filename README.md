# Node.js Microservices with Docker & GitHub Actions

A simple Node.js microservices project demonstrating how to build, containerize, and deploy independent services using **Node.js, Docker, Docker Compose, GitHub Actions, AWS ECR, and AWS EC2**.

---

## 📌 Project Overview

This project contains two independent Node.js microservices:

- **User Service**
- **Order Service**

Each service runs in its own Docker container.

GitHub Actions is used to automatically build Docker images and deploy the services when changes are pushed to the `main` branch.

---

## 🏗️ Architecture

```text
                    Developer
                        |
                        |
                    git push
                        |
                        v
                    GitHub
                        |
                        v
                GitHub Actions
                        |
              +---------+---------+
              |                   |
              v                   v
        User Service        Order Service
          Workflow             Workflow
              |                   |
              v                   v
             ECR                 ECR
              |                   |
              +---------+---------+
                        |
                        v
                    AWS EC2
                        |
                  Docker Compose
                        |
              +---------+---------+
              |                   |
              v                   v
        User Service        Order Service
```

---

# 📁 Project Structure

```text
node.js_microservices/
│
├── .github/
│   └── workflows/
│       ├── user-service.yml
│       └── order-service.yml
│
├── user-service/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── order-service/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 🛠️ Technologies

| Technology | Purpose |
|---|---|
| Node.js | Application runtime |
| Express.js | REST API |
| Docker | Containerization |
| Docker Compose | Run multiple services |
| Git | Source control |
| GitHub | Source code repository |
| GitHub Actions | CI/CD |
| AWS ECR | Docker image registry |
| AWS EC2 | Application server |
| Ubuntu 24.04 | Server OS |

---

# 🔹 Microservices

## 1. User Service

The User Service is responsible for user-related operations.

Example:

```text
User Service
Port: 3001
```

Example endpoint:

```text
GET /
```

Example response:

```json
{
  "service": "User Service",
  "status": "running"
}
```

---

## 2. Order Service

The Order Service is responsible for order-related operations.

Example:

```text
Order Service
Port: 3002
```

Example endpoint:

```text
GET /
```

Example response:

```json
{
  "service": "Order Service",
  "status": "running"
}
```

---

# 🚀 Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/lazaressatya/node.js_microservices.git
```

Go inside the project:

```bash
cd node.js_microservices
```

---

# 2. Check Docker

Verify Docker:

```bash
docker --version
```

Verify Docker Compose:

```bash
docker compose version
```

---

# 3. Build the Application

From the project root:

```bash
docker compose build
```

---

# 4. Start the Microservices

```bash
docker compose up -d
```

Check running containers:

```bash
docker compose ps
```

Expected services:

```text
user-service
order-service
```

---

# 5. Check Logs

User Service:

```bash
docker compose logs user-service
```

Order Service:

```bash
docker compose logs order-service
```

Follow logs:

```bash
docker compose logs -f user-service
```

---

# 6. Test User Service

If the User Service runs on port `3001`:

```bash
curl http://localhost:3001
```

Or open in your browser:

```text
http://localhost:3001
```

---

# 7. Test Order Service

If the Order Service runs on port `3002`:

```bash
curl http://localhost:3002
```

Or open:

```text
http://localhost:3002
```

---

# 🐳 Docker Commands

## Build

```bash
docker compose build
```

## Start

```bash
docker compose up -d
```

## Stop

```bash
docker compose down
```

## Restart

```bash
docker compose restart
```

## Check containers

```bash
docker ps
```

## Check all containers

```bash
docker ps -a
```

## View logs

```bash
docker logs user-service
```

```bash
docker logs order-service
```

## Remove unused images

```bash
docker image prune -f
```

---

# ☁️ AWS Deployment

The application can be deployed to an Ubuntu 24.04 AWS EC2 instance.

Architecture:

```text
GitHub
   |
   v
GitHub Actions
   |
   v
AWS ECR
   |
   v
AWS EC2
   |
   v
Docker Compose
   |
   +----------------+
   |                |
   v                v
User Service    Order Service
```

---

# 1. Create EC2 Instance

Create an EC2 instance with:

```text
Operating System:
Ubuntu 24.04

Instance:
t3.small or higher

Storage:
20 GB or higher
```

---

# 2. Configure Security Group

Allow:

```text
SSH
Port: 22
Source: Your IP

HTTP
Port: 80
Source: 0.0.0.0/0

HTTPS
Port: 443
Source: 0.0.0.0/0
```

For development, the application ports can also be opened if required:

```text
3001
3002
```

For production, it is better to expose only Nginx on ports `80` and `443`.

---

# 3. Connect to EC2

```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

---

# 4. Install Docker

```bash
sudo apt update
```

```bash
sudo apt install -y docker.io docker-compose-v2
```

Start Docker:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Add Ubuntu user to Docker group:

```bash
sudo usermod -aG docker ubuntu
```

Logout:

```bash
exit
```

Login again.

Verify:

```bash
docker --version
```

```bash
docker compose version
```

---

# 5. Install Git

```bash
sudo apt install -y git
```

Verify:

```bash
git --version
```

---

# 6. Clone Repository on EC2

```bash
cd /home/ubuntu
```

```bash
git clone https://github.com/lazaressatya/node.js_microservices.git
```

Enter the project:

```bash
cd node.js_microservices
```

---

# 7. Test Application on EC2

Build:

```bash
docker compose build
```

Start:

```bash
docker compose up -d
```

Check:

```bash
docker compose ps
```

Test:

```bash
curl http://localhost:3001
```

```bash
curl http://localhost:3002
```

---

# 🔐 AWS ECR

Create two ECR repositories:

```text
user-service
order-service
```

Example ECR registry:

```text
ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com
```

Images:

```text
ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/user-service
```

```text
ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/order-service
```

---

# 🔑 GitHub Secrets

Go to:

```text
GitHub
    ↓
Repository
    ↓
Settings
    ↓
Secrets and variables
    ↓
Actions
```

Create the following secrets:

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION

ECR_REGISTRY

SERVER_HOST
SERVER_USER
SERVER_PORT

SSH_PRIVATE_KEY
```

Example:

```text
AWS_REGION = ap-south-1
```

```text
SERVER_USER = ubuntu
```

Do not commit:

```text
.env
.pem
AWS credentials
SSH private keys
passwords
```

to GitHub.

---

# ⚙️ GitHub Actions

The repository uses GitHub Actions workflows under:

```text
.github/workflows/
```

The purpose of the workflows is:

```text
Code Push
    |
    v
GitHub Actions
    |
    v
Checkout
    |
    v
Build Docker Image
    |
    v
Login to AWS ECR
    |
    v
Push Image to ECR
    |
    v
SSH to EC2
    |
    v
Pull Latest Image
    |
    v
Restart Service
```

---

# 🔄 CI/CD Workflow

When code is changed in the User Service:

```text
user-service/
      |
      | git push
      v
GitHub
      |
      v
user-service.yml
      |
      v
Docker Build
      |
      v
AWS ECR
      |
      v
AWS EC2
      |
      v
User Service Updated
```

When code is changed in the Order Service:

```text
order-service/
      |
      | git push
      v
GitHub
      |
      v
order-service.yml
      |
      v
Docker Build
      |
      v
AWS ECR
      |
      v
AWS EC2
      |
      v
Order Service Updated
```

This allows each microservice to have an independent deployment pipeline.

---

# 🧪 Test CI/CD

Make a change to User Service.

Example:

```javascript
{
  "service": "User Service",
  "version": "2.0",
  "status": "running"
}
```

Commit:

```bash
git add .
```

```bash
git commit -m "Update user service"
```

Push:

```bash
git push origin main
```

Go to:

```text
GitHub
    ↓
Actions
```

Check:

```text
User Service CI/CD
```

The workflow should:

```text
✓ Checkout
✓ Configure AWS
✓ Login to ECR
✓ Build Docker Image
✓ Push Docker Image
✓ Connect to EC2
✓ Pull Image
✓ Restart Container
```

---

# 🔍 Verify Deployment

SSH into EC2:

```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

Check containers:

```bash
docker ps
```

Check User Service:

```bash
curl http://localhost:3001
```

Check Order Service:

```bash
curl http://localhost:3002
```

Check logs:

```bash
docker logs user-service
```

```bash
docker logs order-service
```

---

# 🧹 Stop Application

```bash
docker compose down
```

---

# 🔄 Restart Application

```bash
docker compose up -d
```

---

# 📊 Project Flow

```text
             Developer
                 |
                 |
             git push
                 |
                 v
              GitHub
                 |
                 v
         GitHub Actions
                 |
       +---------+---------+
       |                   |
       v                   v
 User Workflow        Order Workflow
       |                   |
       v                   v
     AWS ECR             AWS ECR
       |                   |
       +---------+---------+
                 |
                 v
              AWS EC2
                 |
          Docker Compose
                 |
       +---------+---------+
       |                   |
       v                   v
 User Service        Order Service
```

---

# 🎯 Learning Objectives

This project demonstrates:

- Microservices architecture
- Node.js REST APIs
- Independent service deployment
- Docker containerization
- Docker Compose
- GitHub Actions
- CI/CD pipelines
- AWS ECR
- AWS EC2
- Linux administration
- SSH deployment
- Container networking
- Environment variables
- AWS IAM
- Git and GitHub

---

# 🚀 Future Improvements

The project can be extended with:

```text
✓ MongoDB
✓ PostgreSQL
✓ Nginx
✓ API Gateway
✓ Authentication / JWT
✓ Redis
✓ RabbitMQ
✓ HTTPS / SSL
✓ AWS Secrets Manager
✓ CloudWatch
✓ Prometheus
✓ Grafana
✓ Trivy
✓ SonarQube
✓ Terraform
✓ Kubernetes
✓ AWS EKS
```

---

# 👨‍💻 Author

**Lazares Sathya**

GitHub:

https://github.com/lazaressatya

Repository:

https://github.com/lazaressatya/node.js_microservices
```

I would commit this as the next change:

```bash
git status
git add README.md
git commit -m "Add project documentation"
git push origin main
```

Then verify the README appears on your repository's main page. [Your GitHub repository](https://github.com/lazaressatya/node.js_microservices?utm_source=chatgpt.com)

One important point: your current repository shows **only `user-service` and `order-service`**, so I intentionally wrote the README around those two services rather than documenting services that aren't actually in the repo yet.
