from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Flashcard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    english = db.Column(db.String(80), nullable=False)
    russian = db.Column(db.String(80), nullable=False)
    meaning = db.Column(db.String(120), nullable=True)
