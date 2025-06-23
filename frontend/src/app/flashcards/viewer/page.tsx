"use client";

import { useEffect, useState } from "react";
import { Flashcard } from "@/types";
import { fetchFlashcards } from "@/lib/api";

export default function FlashcardViewer() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    async function load() {
      const cards = await fetchFlashcards();
      setFlashcards(cards);
    }
    load();
  }, []);

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((i) => (i + 1) % flashcards.length);
  };

  if (!currentCard)
    return <p className="text-center mt-10">Loading cards...</p>;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="mb-2 text-sm text-gray-500">
        Card {currentIndex + 1} of {flashcards.length}
      </div>

      <div
        onClick={() => setFlipped(!flipped)}
        className="w-80 h-48 border rounded-xl shadow-lg flex items-center justify-center text-2xl font-semibold cursor-pointer transition-all bg-white hover:shadow-xl"
      >
        {flipped ? currentCard.russian : currentCard.english}
      </div>

      <div className="mt-4 flex flex-col items-center">
        <p className="text-gray-600 text-sm mb-2">
          {flipped && currentCard.meaning}
        </p>
        {flipped && currentCard.pos && (
          <span className="text-xs text-gray-500">({currentCard.pos})</span>
        )}
        <button
          onClick={handleNext}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
