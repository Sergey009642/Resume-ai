# HH-AI 📝🤖  
**Онлайн-генератор резюме на основе ИИ**  

HH-AI — это веб-приложение, которое помогает пользователям создавать и редактировать резюме с помощью искусственного интеллекта.  
Вы можете загрузить своё резюме или ввести данные вручную, а затем получить идеально оформленный документ в PDF или DOCX.  

---  

## 🚀 **Развёртывание через Docker Compose**  

### **1. Клонирование репозитория**  
```sh
git clone *ссылка на репозиторий*.git  
cd hh-ai
```

### **2. Настройка `.env`**  
Скопируйте `.env.example` в `.env` и заполните нужные параметры.  

```sh
cp .env.example .env  
nano .env  # Отредактируйте файл при необходимости
```

### **3. Запуск контейнеров**  
```sh
docker compose up -d --build
```

### **4. Остановка контейнеров**  
```sh
docker compose down
```

---  

## ⚙️ **Переменные окружения**  

| Переменная | Значение по умолчанию | Описание |
|------------|----------------------|----------|
| `POSTGRES_DB` | `flaskdb` | Имя базы данных |
| `POSTGRES_USER` | `flaskuser` | Пользователь базы данных |
| `POSTGRES_PASSWORD` | `supersecurepassword` | Пароль пользователя БД |
| `POSTGRES_HOST` | `db` | Хост PostgreSQL |
| `POSTGRES_PORT` | `5432` | Порт БД |
| `DATABASE_URL` | `postgresql://flaskuser:supersecurepassword@db:5432/flaskdb` | Полный URL БД |
| `SECRET_KEY` | `mysecretkey` | Секретный ключ Flask |
| `FLASK_ENV` | `development` | Среда выполнения (`development` или `production`) |
| `PYTHONUNBUFFERED` | `1` | Отключение буферизации вывода Python |
| `FLASK_APP` | `run.py` | Главный файл Flask |
| `API_KEY` | `""` | API-ключ для внешних сервисов |
| `BASE_URL` | `https://api.proxyapi.ru/openai/v1` | Базовый URL API |
| `PROMPT` | _Текстовое значение_ | Главный промпт ИИ для генерации резюме |
| `PROMPT_FIELD` | _Текстовое значение_ | Промпт для проверки орфографии |
| `PROMPT_RAND_DATA` | _Текстовое значение_ | Промпт для генерации резюме с рандомизацией |
| `PROMPT_NO_RAND_DATA` | _Текстовое значение_ | Промпт для генерации резюме без рандомизации |

---

## 📂 **Структура проекта**  

```plaintext
hh-ai/
│── flask-ollama-proxy/     # Бэкенд на Flask
│── hh-ai/                  # Фронтенд на React
│── nginx.conf              # Конфигурация Nginx
│── docker-compose.yml      # Конфигурация Docker Compose
│── .env.example            # Пример файла переменных окружения
│── README.md               # Этот файл
```

---

## 🛠 **Технологии**  

- **Backend**: Flask, PostgreSQL  
- **Frontend**: React  
- **AI**: OpenAI API  
- **Infrastructure**: Docker, Nginx  

---

## 📝 **Лицензия**  
Этот проект распространяется под лицензией... *не знаю какой*.  
