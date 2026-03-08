#!/bin/bash
set -e

# Build Next.js
npm ci
npm run build

# Generate products.json
node scripts/build-products-json.js

# Install PHP dependencies (PHPMailer, Stripe)
composer install --no-dev --optimize-autoloader

# Assemble everything directly in 'deploy' root.
# IONOS will sync this folder to the webspace.
# "Public folder path = public" means Apache document root = <webspace>/public/
# So we create deploy/public/ and put all web files there.
# BUT: we also place .htaccess at deploy/.htaccess as a fallback.

mkdir -p deploy/api

# Copy Next.js static export directly into deploy/
cp -r out/* deploy/

# Copy PHP API files
cp php/api/*.php deploy/api/
cp php/api/products.json deploy/api/

# Create .htaccess in the deploy root
cat > deploy/.htaccess << 'HTEOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteRule ^(.*)$ /index.html [L]
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\.php$">
    Header set Access-Control-Allow-Methods "POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type"
  </FilesMatch>
</IfModule>

Options -Indexes
DirectoryIndex index.html index.php
HTEOF

# Copy Composer vendor if it exists
if [ -d "vendor" ]; then
  cp -r vendor deploy/vendor
fi

echo "=== Deploy folder structure ==="
ls -la deploy/
echo "=== index.html check ==="
ls -la deploy/index.html 2>/dev/null || echo "WARNING: No index.html!"
