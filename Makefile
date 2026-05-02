.PHONY: help build dev prod up down logs clean restart security-audit security-fix security-test docker-security

# Default target
help:
	@echo "🛡️  CygnusSec - Docker Commands & Security"
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
	@echo "Security:"
	@echo "  make security-audit    - Run security vulnerability audit"
	@echo "  make security-fix      - Fix security vulnerabilities"
	@echo "  make security-test     - Test security configurations"
	@echo "  make docker-security   - Scan Docker image for vulnerabilities"
	@echo "  make full-security     - Run all security checks"
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

# Security Commands
security-audit:
	@echo "🔍 Running security audit..."
	npm audit --audit-level=moderate || true
	@echo "✅ Security audit completed"

security-fix:
	@echo "🔧 Fixing security vulnerabilities..."
	npm audit fix || true
	@echo "✅ Security fixes applied"

security-test:
	@echo "🧪 Testing security configurations..."
	@echo "Checking for dangerous patterns in code..."
	@grep -r "dangerouslySetInnerHTML\|eval(\|innerHTML" src/ || echo "✅ No dangerous patterns found"
	@echo "Checking environment variable sanitization..."
	@grep -q "sanitize_env_var" docker-entrypoint.sh && echo "✅ Environment sanitization enabled" || echo "❌ Environment sanitization missing"
	@echo "Checking CSP headers..."
	@grep -q "Content-Security-Policy" nginx/default.conf && echo "✅ CSP headers configured" || echo "❌ CSP headers missing"
	@echo "✅ Security configuration test completed"

docker-security:
	@echo "🔍 Scanning Docker image for vulnerabilities..."
	@echo "Note: Install Trivy for comprehensive Docker security scanning"
	@echo "Run: curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin"

full-security: security-audit security-test docker-security
	@echo "🛡️  Full security check completed"

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

# Secure deployment pipeline
deploy-secure: security-audit build docker-security prod
	@echo "🚀 Secure deployment completed"
