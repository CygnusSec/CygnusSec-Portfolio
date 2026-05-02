#!/bin/sh
set -e

CONFIG_FILE="/usr/share/nginx/html/config.js"
CONFIG_TEMPLATE="/usr/share/nginx/html/config.js.template"
CONTENT_DIR="/usr/share/nginx/html/content"
CONTENT_SEED="/usr/share/nginx/html/content-seed"

# Function to sanitize environment variable values
sanitize_env_var() {
    local value="$1"
    
    # Remove dangerous characters and patterns
    value=$(echo "$value" | sed 's/[<>]//g')           # Remove < >
    value=$(echo "$value" | sed 's/[&]//g')            # Remove &
    value=$(echo "$value" | sed 's/["]//g')            # Remove quotes
    value=$(echo "$value" | sed "s/[']//g")            # Remove single quotes
    value=$(echo "$value" | sed 's/[`]//g')            # Remove backticks
    value=$(echo "$value" | sed 's/[$]//g')            # Remove $
    value=$(echo "$value" | sed 's/[\\]//g')           # Remove backslashes
    value=$(echo "$value" | sed 's/javascript://gi')   # Remove javascript: protocol
    value=$(echo "$value" | sed 's/data://gi')         # Remove data: protocol
    value=$(echo "$value" | sed 's/vbscript://gi')     # Remove vbscript: protocol
    value=$(echo "$value" | sed 's/on[a-z]*=//gi')     # Remove event handlers
    value=$(echo "$value" | sed 's/<script.*<\/script>//gi') # Remove script tags
    
    # Limit length to prevent buffer overflow
    if [ ${#value} -gt 500 ]; then
        value=$(echo "$value" | cut -c1-500)
    fi
    
    echo "$value"
}

# Seed content volume on first run (if volume is empty)
if [ -d "$CONTENT_SEED" ] && [ -z "$(ls -A $CONTENT_DIR 2>/dev/null)" ]; then
  echo "📦 Seeding content volume from image..."
  cp -r "$CONTENT_SEED/." "$CONTENT_DIR/"
  echo "✅ Content seeded successfully!"
fi

if [ -f "$CONFIG_TEMPLATE" ]; then
  echo "🔄 Sanitizing and injecting runtime environment variables..."
  
  # Sanitize all environment variables before injection
  export VITE_SITE_NAME=$(sanitize_env_var "${VITE_SITE_NAME:-}")
  export VITE_SITE_TITLE=$(sanitize_env_var "${VITE_SITE_TITLE:-}")
  export VITE_SITE_URL=$(sanitize_env_var "${VITE_SITE_URL:-}")
  export VITE_AUTHOR_NAME=$(sanitize_env_var "${VITE_AUTHOR_NAME:-}")
  export VITE_AUTHOR_NAME_EN=$(sanitize_env_var "${VITE_AUTHOR_NAME_EN:-}")
  export VITE_AUTHOR_POSITION=$(sanitize_env_var "${VITE_AUTHOR_POSITION:-}")
  export VITE_AUTHOR_ORGANIZATION=$(sanitize_env_var "${VITE_AUTHOR_ORGANIZATION:-}")
  export VITE_AUTHOR_LOCATION=$(sanitize_env_var "${VITE_AUTHOR_LOCATION:-}")
  export VITE_EMAIL=$(sanitize_env_var "${VITE_EMAIL:-}")
  export VITE_GITHUB_URL=$(sanitize_env_var "${VITE_GITHUB_URL:-}")
  export VITE_GITHUB_USERNAME=$(sanitize_env_var "${VITE_GITHUB_USERNAME:-}")
  export VITE_LINKEDIN_URL=$(sanitize_env_var "${VITE_LINKEDIN_URL:-}")
  export VITE_LINKEDIN_USERNAME=$(sanitize_env_var "${VITE_LINKEDIN_USERNAME:-}")
  export VITE_AVATAR_URL=$(sanitize_env_var "${VITE_AVATAR_URL:-}")
  export VITE_NAV_BUTTONS=$(sanitize_env_var "${VITE_NAV_BUTTONS:-}")
  export VITE_GA_ID=$(sanitize_env_var "${VITE_GA_ID:-}")
  
  envsubst < "$CONFIG_TEMPLATE" > "$CONFIG_FILE"
  echo "✅ Environment variables sanitized and injected successfully!"
else
  echo "⚠️  Warning: config.js.template not found, skipping injection"
fi

echo "🚀 Starting Nginx..."
exec nginx -g "daemon off;"
