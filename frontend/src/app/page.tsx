"use client";

import { useState } from "react";
import { fetchTranslations, saveTranslation } from "../lib/api";
import type { Translation } from "../lib/api";
import TranslationResult from "@/components/TranslationResult";

export default function Home() {
  const [word, setWord] = useState("");
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTranslate() {
    setError("");
    setTranslations([]); // ← clear old results
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

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Translate English → Russian</h1>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {translations.map((t, i) => (
          <TranslationResult key={i} translation={t} onSave={handleSave} />
        ))}
      </div>
    </main>
  );
}
