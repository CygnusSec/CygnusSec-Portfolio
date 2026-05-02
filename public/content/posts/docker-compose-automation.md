# Automating Infrastructure with Docker and Compose

Before Docker, deploying a service meant a long checklist: install dependencies, configure the environment, handle conflicts with other services. Docker Compose made that repeatable and portable.

## A Simple Example

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
```

One file. One command. The service is running.

## What I Actually Use It For

- Running personal projects and tools
- Spinning up test environments quickly
- Keeping services isolated from each other
- Making deployments reproducible across machines

## The Bigger Picture

Compose is just one piece. The real value comes from combining it with proper environment management, health checks, and a clear mental model of how your services depend on each other. Once you have that, deployments stop being stressful.
