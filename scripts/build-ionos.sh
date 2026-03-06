#!/bin/bash
set -e

echo "Installing Node.js dependencies..."
npm ci

echo "Building Next.js static site..."
npm run build

echo "Building products.json for PHP API..."
node scripts/build-products-json.js

echo "Installing PHP backend dependencies..."
composer install --no-dev --optimize-autoloader

echo "Assembling deployment folder for Ionos Deploy Now..."
rm -rf deploy
mkdir -p deploy/public

echo "Copying static HTML export..."
cp -r out/* deploy/public/

echo "Copying PHP API..."
mkdir -p deploy/public/api
cp php/api/*.php deploy/public/api/
cp php/api/products.json deploy/public/api/

echo "Copying Apache configurations..."
cp php/.htaccess deploy/public/.htaccess

echo "Copying Composer dependencies securely..."
cp -r vendor deploy/vendor

echo "=================================================="
echo "IONOS BUILD SUCCESSFUL!"
echo "The 'deploy' folder is ready."
echo "IMPORTANT: In Ionos Deploy Now, set the 'Publish directory' (Document Root) to 'deploy/public'."
echo "=================================================="
