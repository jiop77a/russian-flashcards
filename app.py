from flask import Flask, render_template, request
import requests
import config

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def home():
    translation_results = None

    if request.method == "POST":
        word = request.form.get("word")
        if word:
            params = {
                "key": config.YANDEX_API_KEY,
                "lang": config.YANDEX_LANG_PAIR,
                "text": word,
            }
            response = requests.get(config.YANDEX_API_URL, params=params)
            if response.status_code == 200:
                translation_results = response.json()
            else:
                translation_results = {"error": "Failed to fetch translations"}

    return render_template("home.html", result=translation_results)


if __name__ == "__main__":
    app.run(debug=True)
