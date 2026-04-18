# ECS Project

This project demonstrates deploying a simple Node.js backend application to AWS ECS (Elastic Container Service). It includes a basic Express.js server with health check endpoints, containerized using Docker, and configured for deployment on AWS ECS.

## Features

- Simple Express.js server with RESTful endpoints
- Health check endpoint for load balancer monitoring
- Docker containerization for easy deployment
- AWS ECS deployment configuration

## Prerequisites

- Node.js (version 14 or higher)
- Docker
- AWS CLI configured with appropriate permissions
- An AWS account with ECS access

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/samiullah553/ecs-project.git
   cd ecs-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

To run the application locally:

```bash
npm start
```

Or directly with Node.js:

```bash
node server.js
```

The server will start on `http://localhost:3000`.

### Available Endpoints

- `GET /` - Returns "Hello, World!"
- `POST /data` - Returns "Data received!"
- `GET /health` - Health check endpoint

## Docker

### Build the Docker Image

```bash
docker build -t ecs-project .
```

### Run the Docker Container

```bash
docker run -p 3000:3000 ecs-project
```

## Deployment to AWS ECS

### Step 1: Build and Push Docker Image to ECR

1. Create an ECR repository:
   ```bash
   aws ecr create-repository --repository-name ecs-project --region your-region
   ```

2. Authenticate Docker to ECR:
   ```bash
   aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com
   ```

3. Tag and push the image:
   ```bash
   docker tag ecs-project:latest your-account-id.dkr.ecr.your-region.amazonaws.com/ecs-project:latest
   docker push your-account-id.dkr.ecr.your-region.amazonaws.com/ecs-project:latest
   ```

### Step 2: Create ECS Cluster

```bash
aws ecs create-cluster --cluster-name ecs-project-cluster --region your-region
```

### Step 3: Create Task Definition

Create a task definition JSON file (e.g., `task-definition.json`):

```json
{
  "family": "ecs-project-task",
  "taskRoleArn": "arn:aws:iam::your-account-id:role/ecsTaskExecutionRole",
  "executionRoleArn": "arn:aws:iam::your-account-id:role/ecsTaskExecutionRole",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "ecs-project-container",
      "image": "your-account-id.dkr.ecr.your-region.amazonaws.com/ecs-project:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000,
          "protocol": "tcp"
        }
      ]
    }
  ]
}
```

Register the task definition:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json --region your-region
```

### Step 4: Create ECS Service

```bash
aws ecs create-service \
  --cluster ecs-project-cluster \
  --service-name ecs-project-service \
  --task-definition ecs-project-task \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345,subnet-67890],securityGroups=[sg-12345],assignPublicIp=ENABLED}" \
  --region your-region
```

Replace `subnet-12345,subnet-67890` and `sg-12345` with your actual subnet IDs and security group ID.

## Environment Variables

The application currently does not use environment variables, but you can add them in the task definition if needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.