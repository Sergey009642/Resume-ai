from datetime import timedelta
import imgkit
import base64
from PIL import Image
from io import BytesIO

from flask_jwt_extended import create_access_token

from app.config import Config


def generate_token(user_id, expires=timedelta(hours=Config.ACCESS_TOKEN_TIME)):
    return create_access_token(identity=user_id, expires_delta=expires)


def html_to_base64_preview(html, width=300):
    """Преобразует HTML в PNG и масштабирует его до нужной ширины, затем кодирует в base64."""
    options = {
        'format': 'png',
        'encoding': 'UTF-8',
        'disable-smart-width': '',
    }

    try:
        # Получаем байты PNG из HTML
        image_bytes = imgkit.from_string(html, False, options=options)

        # Открываем как изображение
        image = Image.open(BytesIO(image_bytes))

        # Масштабируем
        ratio = width / image.width
        new_height = int(image.height * ratio)
        image = image.resize((width, new_height), Image.LANCZOS)

        # Сохраняем обратно в байты
        output = BytesIO()
        image.save(output, format='PNG')
        output.seek(0)

        # Преобразуем в base64
        encoded = base64.b64encode(output.read()).decode('utf-8')
        return f"data:image/png;base64,{encoded}"
    except Exception as e:
        print(f"[html_to_base64_preview] Ошибка: {e}")
        return None
