from flask import Flask
from flask_cors import CORS
from sqlalchemy import text
from models import db
from config import *
from api import api

app = Flask(__name__)
app.config.from_pyfile("config.py")

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

db.init_app(app)

# Create tables on startup
with app.app_context():
    db.create_all()

app.register_blueprint(api)
