from flask import request, jsonify
from . import api
from models import db, Flashcard
from config import YANDEX_API_KEY, YANDEX_API_URL, YANDEX_LANG_PAIR
import requests


@api.route("/translate")
def translate():
    word = request.args.get("word")
    if not word:
        return jsonify({"error": "Missing 'word' param"}), 400

    response = requests.get(
        YANDEX_API_URL,
        params={"key": YANDEX_API_KEY, "lang": YANDEX_LANG_PAIR, "text": word},
    )

    if response.status_code != 200:
        return jsonify({"error": "API failed"}), 500

    data = response.json()
    results = []

    for entry in data.get("def", []):
        for tr in entry.get("tr", []):
            results.append(
                {
                    "russian": tr["text"],
                    "glosses": [m["text"] for m in tr.get("mean", [])] or [],
                    "pos": tr.get("pos"),
                    "aspect": tr.get("asp"),
                    "synonyms": [s["text"] for s in tr.get("syn", [])] or [],
                    "frequency": tr.get("fr"),
                }
            )

    return jsonify({"translations": results})


@api.route("/flashcards", methods=["POST"])
def save_flashcard():
    data = request.get_json()
    english = data.get("english")
    russian = data.get("russian")
    meaning = data.get("meaning")

    if not english or not russian:
        return jsonify({"error": "Missing required fields"}), 400

    card = Flashcard(english=english, russian=russian, meaning=meaning)
    db.session.add(card)
    db.session.commit()

    return jsonify({"message": "Flashcard saved successfully"})
