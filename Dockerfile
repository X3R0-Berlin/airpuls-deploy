# Stage 1: Build static site
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build && node scripts/build-products-json.js

# Stage 2: Install PHP dependencies
FROM composer:2 AS php-deps
WORKDIR /app
COPY composer.json ./
RUN composer install --no-dev --optimize-autoloader

# Stage 3: Production (Apache + PHP)
FROM php:8.2-apache AS runner

# Enable Apache modules
RUN a2enmod rewrite headers

# Copy static site
COPY --from=builder /app/out/ /var/www/html/

# Copy PHP API files
COPY php/api/*.php /var/www/html/api/
COPY --from=builder /app/php/api/products.json /var/www/html/api/
COPY php/.htaccess /var/www/html/.htaccess

# Copy Composer vendor (outside web root)
COPY --from=php-deps /app/vendor/ /var/www/vendor/

# Install PHP extensions for MariaDB
RUN docker-php-ext-install pdo pdo_mysql

# Apache config: allow .htaccess
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Fix vendor path in PHP config
RUN sed -i "s|__DIR__ . '/../../vendor/autoload.php'|'/var/www/vendor/autoload.php'|g" /var/www/html/api/checkout.php /var/www/html/api/webhook.php

EXPOSE 80
