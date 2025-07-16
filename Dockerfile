# Используем Node для сборки и запуска
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY package.json package-lock.json* ./
RUN npm install

# Копируем исходники
COPY . .

# Собираем проект (Vite использует `vite build`)
RUN npm run build

# Запускаем сервер для статики (встроенный в Vite)
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]