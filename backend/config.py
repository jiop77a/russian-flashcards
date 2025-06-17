from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Configuration values
YANDEX_API_KEY = os.getenv("YANDEX_API_KEY")
YANDEX_API_URL = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup"
YANDEX_LANG_PAIR = "en-ru"
