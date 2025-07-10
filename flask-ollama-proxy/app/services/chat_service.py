from flask import jsonify
from openai import OpenAI

from app import Config


def process_text(data, prompt):
    try:
        client = OpenAI(
            api_key=Config.API_KEY,
            base_url=Config.BASE_URL,
        )

        chat_completion = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": f"{prompt}"},
                {"role": "user", "content": f"{data}"}
            ]
        )

        print(f"Response: {chat_completion}")
        return chat_completion
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500
