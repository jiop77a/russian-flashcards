"use client";

import { useEffect, useState } from "react";
import { fetchFlashcards, Flashcard } from "@/lib/api";
import FlashcardCard from "@/components/FlashcardCard";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((card) => (
          <FlashcardCard key={card.id} card={card} />
        ))}
      </div>
    </main>
  );
}
