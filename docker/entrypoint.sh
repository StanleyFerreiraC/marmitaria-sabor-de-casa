#!/bin/sh
set -e

# A hospedagem informa a porta pela variável PORT (Render usa 10000); localmente usa 80.
PORT="${PORT:-80}"
sed -i "s/^Listen .*/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:[0-9]*>/<VirtualHost *:${PORT}>/" /etc/apache2/sites-available/000-default.conf

php artisan package:discover --ansi
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force

# Dados de exemplo: defina SEMEAR_DADOS=true só no primeiro deploy.
if [ "${SEMEAR_DADOS}" = "true" ]; then
    php artisan db:seed --force
fi

exec apache2-foreground
