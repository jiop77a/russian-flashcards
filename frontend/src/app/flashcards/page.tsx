"use client";

import { useEffect, useState } from "react";
import { fetchFlashcards, Flashcard } from "@/lib/api";

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFlashcards()
      .then(setFlashcards)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Saved Flashcards</h1>
      {error && <p className="text-red-600">{error}</p>}
      {flashcards.length === 0 && !error && <p>No flashcards found.</p>}
      <ul className="grid gap-4 sm:grid-cols-2">
        {flashcards.map((card) => (
          <li
            key={card.id}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow transition"
          >
            <h2 className="text-xl font-semibold text-blue-700">
              {card.russian}
            </h2>
            <p className="text-gray-800">
              <strong>English:</strong> {card.english}
            </p>
            {card.meaning && (
              <p className="text-gray-600">
                <strong>Meaning:</strong> {card.meaning}
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
