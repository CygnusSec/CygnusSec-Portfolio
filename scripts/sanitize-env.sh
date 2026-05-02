#!/bin/bash
# Environment Variable Sanitizer for Docker Runtime Injection
# Prevents XSS and injection attacks through environment variables

set -e

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

# Sanitize all VITE_ environment variables
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

echo "✅ Environment variables sanitized successfully!"