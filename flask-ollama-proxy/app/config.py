import os
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
if not load_dotenv(dotenv_path=env_path):
    print("Предупреждение: файл .env не найден или не загружен.")


class Config:
    # База данных
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

    # Секретный ключ Flask
    SECRET_KEY = os.getenv("SECRET_KEY")

    # Окружение Flask (development, production и т.д.)
    FLASK_ENV = os.getenv("FLASK_ENV", "production")

    # Параметры для OpenAI
    API_KEY = os.getenv("API_KEY")
    BASE_URL = os.getenv("BASE_URL")

    # Промпты
    PROMPT = os.getenv("PROMPT")
    PROMPT_FIELD = os.getenv("PROMPT_FIELD")
    PROMPT_RAND_DATA = os.getenv("PROMPT_RAND_DATA")
    PROMPT_NO_RAND_DATA = os.getenv("PROMPT_NO_RAND_DATA")

    # Настройки SQLAlchemy
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Время жизни токена авторизации в часах
    ACCESS_TOKEN_TIME = 2
