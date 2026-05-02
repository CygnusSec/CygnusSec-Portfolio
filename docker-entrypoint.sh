#!/bin/sh
set -e

# Replace environment variables in config.js at runtime
CONFIG_FILE="/usr/share/nginx/html/config.js"

if [ -f "$CONFIG_FILE" ]; then
  echo "🔄 Injecting runtime environment variables..."
  
  # Replace placeholders with actual environment variables
  # Using @ as delimiter to avoid conflict with | in NAV_BUTTONS and / in URLs
  sed -i "s@__VITE_SITE_NAME__@${VITE_SITE_NAME:-Cygnus Security}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_SITE_TITLE__@${VITE_SITE_TITLE:-Dylan Tran | CygnusSec}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_SITE_URL__@${VITE_SITE_URL:-http://localhost:8080}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_AUTHOR_NAME__@${VITE_AUTHOR_NAME:-Trần Đại Dương}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_AUTHOR_NAME_EN__@${VITE_AUTHOR_NAME_EN:-Dylan Tran}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_AUTHOR_POSITION__@${VITE_AUTHOR_POSITION:-Researcher}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_AUTHOR_ORGANIZATION__@${VITE_AUTHOR_ORGANIZATION:-Institute of Information Technology}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_AUTHOR_LOCATION__@${VITE_AUTHOR_LOCATION:-Hanoi, Vietnam}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_EMAIL__@${VITE_EMAIL:-dylan@cygnussec.com}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_GITHUB_URL__@${VITE_GITHUB_URL:-https://github.com/CygnusSec}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_GITHUB_USERNAME__@${VITE_GITHUB_USERNAME:-CygnusSec}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_LINKEDIN_URL__@${VITE_LINKEDIN_URL:-https://linkedin.com/in/dylantran}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_LINKEDIN_USERNAME__@${VITE_LINKEDIN_USERNAME:-dylantran}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_AVATAR_URL__@${VITE_AVATAR_URL:-https://i.ibb.co/MBtjqXQ/avatar.jpg}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_NAV_BUTTONS__@${VITE_NAV_BUTTONS:-Blog:/blog|Researchs:/researches|Tags:/tags|About:/about}@g" "$CONFIG_FILE"
  sed -i "s@__VITE_GA_ID__@${VITE_GA_ID:-}@g" "$CONFIG_FILE"
  
  echo "✅ Environment variables injected successfully!"
else
  echo "⚠️  Warning: config.js not found at $CONFIG_FILE"
fi

# Start nginx
echo "🚀 Starting Nginx..."
exec nginx -g "daemon off;"
