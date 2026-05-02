# ============================
# 🏗️  Stage 1: Build React App
# ============================
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies fresh (avoids optional dependency issues)
RUN npm install && \
    npm cache clean --force

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_SITE_NAME
ARG VITE_SITE_TITLE
ARG VITE_SITE_URL
ARG VITE_AUTHOR_NAME
ARG VITE_AUTHOR_NAME_EN
ARG VITE_AUTHOR_POSITION
ARG VITE_AUTHOR_ORGANIZATION
ARG VITE_AUTHOR_LOCATION
ARG VITE_EMAIL
ARG VITE_GITHUB_URL
ARG VITE_GITHUB_USERNAME
ARG VITE_LINKEDIN_URL
ARG VITE_LINKEDIN_USERNAME
ARG VITE_AVATAR_URL
ARG VITE_NAV_BUTTONS
ARG VITE_GA_ID

# Build the app for production
RUN npm run build

# ============================
# 🚀 Stage 2: Serve with Nginx
# ============================
FROM nginx:alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

WORKDIR /usr/share/nginx/html

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Add non-root user for security
RUN addgroup -g 1001 -S nginx-user && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx-user -g nginx-user nginx-user && \
    chown -R nginx-user:nginx-user /usr/share/nginx/html && \
    chown -R nginx-user:nginx-user /var/cache/nginx && \
    chown -R nginx-user:nginx-user /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx-user:nginx-user /var/run/nginx.pid

# Switch to non-root user
USER nginx-user

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
