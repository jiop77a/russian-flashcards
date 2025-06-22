from flask import Flask
from flask_cors import CORS
from sqlalchemy import text
from models import db
from config import *
from api import api

app = Flask(__name__)
app.config.from_pyfile("config.py")

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "http://localhost:3000",
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"],
        }
    },
)

db.init_app(app)
app.register_blueprint(api)

# Create tables on startup
with app.app_context():
    db.create_all()

    # Debug: List all registered routes
    print("\n📍 Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f"{rule.endpoint:20s} {rule.methods} {rule.rule}")
    print()
