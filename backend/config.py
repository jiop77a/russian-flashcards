import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Path to current directory
basedir = os.path.abspath(os.path.dirname(__file__))

# Flask + SQLAlchemy config
SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(basedir, 'flashcards.db')}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
DEBUG = True

# Yandex Dictionary API config
YANDEX_API_KEY = os.getenv("YANDEX_API_KEY")
YANDEX_API_URL = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup"
YANDEX_LANG_PAIR = "en-ru"
