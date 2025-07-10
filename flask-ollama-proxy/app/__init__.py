from flask_bcrypt import Bcrypt

from app.config import Config
from app.extensions import db, migrate
from app.routes import register_routes

from flask_jwt_extended import JWTManager


def setup_app(app):
    app.config.from_object(Config)

    db.init_app(app)

    jwt = JWTManager(app)
    bcrypt = Bcrypt(app)

    migrate.init_app(app, db)

    register_routes(app)
