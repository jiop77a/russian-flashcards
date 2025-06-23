"use client";

import { useState } from "react";
import { fetchTranslations, saveTranslation } from "../lib/api";
import type { Translation } from "@/types";
import TranslationResult from "@/components/TranslationResult";
import type { PartOfSpeech } from "@/types";

export default function Home() {
  const [word, setWord] = useState("");
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPos, setSelectedPos] = useState<PartOfSpeech | null>(null);

  async function handleTranslate() {
    setError("");
    setTranslations([]); // ← clear old results
    setSelectedPos(null);
    setLoading(true);
    try {
      const data = await fetchTranslations(word);
      setTranslations(data.translations ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (t: Translation) => {
    try {
      await saveTranslation(word, t);
      alert("Flashcard saved!");
    } catch (err) {
      alert("Error saving flashcard.");
      console.error(err);
    }
  };

  const allPos = Array.from(
    new Set(translations.map((t) => t.pos || "unknown"))
  );

  const filteredTranslations =
    selectedPos === null
      ? translations
      : translations.filter((t) => t.pos === selectedPos);

  return (
    <>
      <main style={{ padding: "2rem" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // ← prevent page reload
            handleTranslate();
          }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mx-auto my-6"
        >
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter English word"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            type="submit"
            disabled={loading || !word}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </form>

        {loading && <p>🔄 Translating...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading &&
          !error &&
          translations.length === 0 &&
          word.trim() !== "" && <p>No results found.</p>}

        {allPos.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap justify-center">
            <button
              onClick={() => setSelectedPos(null)}
              className={`px-3 py-1 rounded-full border ${
                selectedPos === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              All
            </button>
            {allPos.map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedPos(pos)}
                className={`px-3 py-1 rounded-full border ${
                  selectedPos === pos
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTranslations.map((t, i) => (
            <TranslationResult key={i} translation={t} onSave={handleSave} />
          ))}
        </div>
      </main>
    </>
  );
}
