def register_routes(app):
    from app.routes.auth import bp as auth_bp
    from app.routes.resumes import bp as resumes_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(resumes_bp)
