from app.extensions import db
from sqlalchemy.dialects.postgresql import JSONB


class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    data = db.Column(JSONB, nullable=False)  # JSON с параметрами конструктора
    html_content = db.Column(db.Text, nullable=True)  # HTML-код резюме
    image_base64 = db.Column(db.Text, nullable=True)  # Картинка в base64

    user = db.relationship("User", backref=db.backref("resumes", lazy=True))
