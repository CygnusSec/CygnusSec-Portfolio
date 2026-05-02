#!/bin/sh
set -e

CONFIG_FILE="/usr/share/nginx/html/config.js"
CONFIG_TEMPLATE="/usr/share/nginx/html/config.js.template"

if [ -f "$CONFIG_TEMPLATE" ]; then
  echo "🔄 Injecting runtime environment variables..."

  # Use envsubst to replace placeholders - handles special characters safely
  envsubst < "$CONFIG_TEMPLATE" > "$CONFIG_FILE"

  echo "✅ Environment variables injected successfully!"
else
  echo "⚠️  Warning: config.js.template not found, skipping injection"
fi

echo "🚀 Starting Nginx..."
exec nginx -g "daemon off;"
