#!/bin/bash
set -e  # Останавливаем скрипт при ошибке

echo "Waiting for database to be ready..."
until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER"; do
  sleep 2
done

# Проверяем наличие папки миграций и файлов внутри
if [ ! -d "migrations" ]; then
  echo "Initializing database migrations..."
  flask db init
fi

echo "Checking for new migrations..."
flask db migrate -m "Auto migration" || echo "No new migrations to apply"

echo "Applying existing migrations..."
flask db upgrade

echo "Starting Flask application..."
exec flask run --host=0.0.0.0 --port=5000
