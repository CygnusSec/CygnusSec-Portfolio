.PHONY: help build dev prod up down logs clean restart

# Default target
help:
	@echo "🛡️  CygnusSec - Docker Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Start development environment"
	@echo "  make build        - Build Docker image"
	@echo "  make up           - Start containers"
	@echo "  make down         - Stop containers"
	@echo ""
	@echo "Production:"
	@echo "  make prod         - Start production environment"
	@echo "  make prod-build   - Build production image"
	@echo "  make prod-up      - Start production containers"
	@echo "  make prod-down    - Stop production containers"
	@echo ""
	@echo "Utilities:"
	@echo "  make logs         - View container logs"
	@echo "  make restart      - Restart containers"
	@echo "  make clean        - Remove containers and images"
	@echo "  make shell        - Open shell in container"
	@echo ""

# Development
dev:
	docker-compose up --build

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

# Production
prod:
	docker-compose -f docker-compose.prod.yaml up --build -d

prod-build:
	docker-compose -f docker-compose.prod.yaml build

prod-up:
	docker-compose -f docker-compose.prod.yaml up -d

prod-down:
	docker-compose -f docker-compose.prod.yaml down

# Utilities
logs:
	docker-compose logs -f

logs-prod:
	docker-compose -f docker-compose.prod.yaml logs -f

restart:
	docker-compose restart

restart-prod:
	docker-compose -f docker-compose.prod.yaml restart

clean:
	docker-compose down -v --rmi all
	docker system prune -f

clean-prod:
	docker-compose -f docker-compose.prod.yaml down -v --rmi all

shell:
	docker exec -it cygnussec-web sh

shell-prod:
	docker exec -it cygnussec-web-prod sh

# Health check
health:
	@curl -f http://localhost:8080/ && echo "✅ Service is healthy" || echo "❌ Service is down"

health-prod:
	@curl -f http://localhost/ && echo "✅ Production service is healthy" || echo "❌ Production service is down"
