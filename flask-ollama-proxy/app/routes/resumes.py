import json
import tempfile
import time

import pdfkit
import pypandoc
import requests

from flask import Blueprint, request, jsonify, Response, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_jwt_extended.exceptions import NoAuthorizationError

from app import Config
from app.extensions import db
from app.models.resume import Resume
from app.services.chat_service import process_text
from app.utils import html_to_base64_preview

bp = Blueprint("resumes", __name__, url_prefix="/api/resumes")


@bp.route("/create", methods=["POST"])
@jwt_required()
def create_resume():
    """Создаёт новое резюме в профиле пользователя."""
    user_id = get_jwt_identity()
    data = request.get_json()

    title = data.get("title")
    resume_data = data.get("data")  # JSON с параметрами конструктора
    html_content = data.get("html_content", None)

    if not title or not resume_data:
        return jsonify({"error": "Название и данные резюме обязательны"}), 400

    image_base64 = html_to_base64_preview(html_content) if html_content else None

    new_resume = Resume(
        user_id=user_id,
        title=title,
        data=resume_data,
        html_content=html_content,
        image_base64=image_base64
    )

    try:
        db.session.add(new_resume)
        db.session.commit()
        return jsonify({"id": new_resume.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Ошибка при создании: {str(e)}"}), 500


@bp.route("/delete/<int:resume_id>", methods=["DELETE"])
@jwt_required()
def delete_resume(resume_id):
    """Удаляет резюме, если оно принадлежит текущему пользователю."""
    user_id = get_jwt_identity()
    resume = Resume.query.filter_by(id=resume_id, user_id=user_id).first()

    if not resume:
        return jsonify({"error": "Резюме не найдено или у вас нет прав"}), 404

    try:
        db.session.delete(resume)
        db.session.commit()
        return jsonify({"message": "Резюме успешно удалено"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Ошибка при удалении: {str(e)}"}), 500


@bp.route("/resume/<int:resume_id>", methods=["GET"])
@jwt_required()
def get_resume(resume_id):
    user_id = get_jwt_identity()

    resume = Resume.query.filter_by(id=resume_id, user_id=user_id).first()

    if not resume:
        return jsonify({"error": "Резюме не найдено или нет доступа"}), 404

    return jsonify({
        "data": resume.data,
        "html_content": resume.html_content,
    })


@bp.route("/list/paginated", methods=["GET"])
@jwt_required()
def get_resumes_paginated():
    """Возвращает список резюме текущего пользователя постранично."""
    user_id = get_jwt_identity()

    # Получаем параметры пагинации из запроса
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("page_size", default=10, type=int)

    pagination = Resume.query.with_entities(
        Resume.id, Resume.title, Resume.image_base64, Resume.updated_at, Resume.html_content
    ).filter_by(user_id=user_id).order_by(Resume.updated_at.desc()).paginate(page=page, per_page=per_page, error_out=False)

    resume_list = [
        {
            "id": r.id,
            "title": r.title,
            "preview": r.image_base64,
            "updated_at": r.updated_at.isoformat(),  # Дата в удобном формате
            "has_html_content": bool(r.html_content)
        }
        for r in pagination.items
    ]

    return jsonify({
        "resumes": resume_list,
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": pagination.page,
        "per_page": pagination.per_page
    }), 200


def resolve_html_input():
    """
    Вспомогательная функция: возвращает HTML либо из БД (если передан resume_id), либо из поля html.
    """
    time.sleep(1)
    data = request.get_json()
    resume_id = data.get("resume_id")
    html = data.get("html")

    if resume_id:
        # Проверяем токен, даже если @jwt_required не стоит
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
        except NoAuthorizationError:
            user_id = None

        if not user_id:
            raise PermissionError("Доступ к базе возможен только авторизованным пользователям")

        resume = Resume.query.filter_by(id=resume_id, user_id=user_id).first()

        if not resume or not resume.html_content:
            raise ValueError("Резюме не найдено или отсутствует HTML-контент")

        return resume.html_content

    if not html:
        raise ValueError("Не передан HTML или ID резюме")

    return html


@bp.route("/download/html", methods=["POST"])
def download_as_html():
    try:
        html = resolve_html_input()
        return Response(
            html,
            mimetype="text/html",
            headers={"Content-Disposition": "attachment; filename=resume.html"}
        )
    except PermissionError as e:
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@bp.route("/download/pdf", methods=["POST"])
def download_as_pdf():
    try:
        html = resolve_html_input()
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            pdfkit.from_string(html, tmp.name)
            tmp.flush()
            return send_file(tmp.name, as_attachment=True, download_name="resume.pdf")
    except PermissionError as e:
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@bp.route("/download/docx", methods=["POST"])
def download_as_docx():
    try:
        html = resolve_html_input()
        with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
            pypandoc.convert_text(html, 'docx', format='html', outputfile=tmp.name)
            tmp.flush()
            return send_file(tmp.name, as_attachment=True, download_name="resume.docx")
    except PermissionError as e:
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@bp.route("/field/ai-suggest", methods=["POST"])
def chat_field():
    try:
        data = request.json
        print(f"Received data: {data}")
        message_data = json.loads(data['messages'][0]['message'])
        print(f"Parsed message data: {message_data}")

        prompt = message_data.get('prompt', '').strip() or Config.PROMPT_FIELD

        field_keys = [key for key in message_data.keys() if key != 'prompt']
        if not field_keys:
            return jsonify({"error": "Нет полей для обработки"}), 400

        field_name = field_keys[0]
        field_value = message_data[field_name].strip()
        if not field_value:
            return jsonify({"error": f"Значение поля '{field_name}' пустое"}), 400

        result = process_text(field_value, prompt)
        return jsonify({field_name: result.choices[0].message.content})

    except Exception as e:
        print(f"Ошибка: {e}")
        return jsonify({"error": str(e)}), 500
