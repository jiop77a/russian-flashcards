from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Set(db.Model):
    __tablename__ = "sets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    flashcards = db.relationship("Flashcard", backref="set", lazy=True)


class Flashcard(db.Model):
    __tablename__ = "flashcards"

    id = db.Column(db.Integer, primary_key=True)
    english = db.Column(db.String(120), nullable=False)
    russian = db.Column(db.String(120), nullable=False)
    meaning = db.Column(db.String(250))
    pos = db.Column(db.String(50))
    set_id = db.Column(db.Integer, db.ForeignKey("sets.id"))
