from flask import Blueprint, request, jsonify
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.user import User
from app.utils import generate_token

bp = Blueprint("auth", __name__, url_prefix="/api")


@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirmPassword")
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    middle_name = data.get("middleName")
    about = data.get("about")
    phone = data.get("phone")

    if not email or not password or not confirm_password or not last_name or not first_name or not about or not phone:
        return jsonify({"error": "Все поля обязательны"}), 400

    if password != confirm_password:
        return jsonify({"error": "Пароли не совпадают"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Пользователь с таким email уже существует"}), 400

    hashed_password = generate_password_hash(password).decode('utf-8')

    new_user = User(
        email=email,
        password=hashed_password,
        first_name=first_name,
        last_name=last_name,
        middle_name=middle_name,
        about=about,
        phone=phone
    )

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Ошибка при сохранении пользователя: {str(e)}"}), 500

    access_token = generate_token(new_user.id)
    return jsonify({"message": "Регистрация успешна", "access_token": access_token}), 201


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email и пароль обязательны"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Неверный email или пароль"}), 401

    access_token = generate_token(user.id)
    return jsonify({"message": "Вход выполнен успешно", "access_token": access_token}), 200


@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({"message": "Вы успешно разлогинились"}), 200


@bp.route('/me', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "Пользователь не найден"}), 404

    return jsonify({
        "email": user.email,
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "middle_name": user.middle_name,
        "about": user.about,
        "phone": user.phone
    }), 200


@bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    data = request.get_json()
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')
    confirm_new_password = data.get('confirmNewPassword')

    if not current_password or not new_password or not confirm_new_password:
        return jsonify({"error": "Все поля обязательны"}), 400

    if new_password != confirm_new_password:
        return jsonify({"error": "Новые пароли не совпадают"}), 400

    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or not check_password_hash(user.password, current_password):
        return jsonify({"error": "Текущий пароль неверен"}), 401

    user.password = generate_password_hash(new_password).decode('utf-8')

    try:
        db.session.commit()
        return jsonify({"message": "Пароль успешно обновлён"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Ошибка при обновлении пароля: {str(e)}"}), 500


@bp.route('/update-profile', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()
    new_email = data.get('email')
    new_name = data.get('name')

    if not new_email or not new_name:
        return jsonify({"error": "Все поля обязательны"}), 400

    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "Пользователь не найден"}), 404

    # Обновление данных пользователя
    user.email = new_email
    user.name = new_name

    try:
        db.session.commit()
        return jsonify({"message": "Профиль успешно обновлён"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Ошибка при обновлении профиля: {str(e)}"}), 500

