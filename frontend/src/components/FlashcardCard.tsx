import { Flashcard } from "@/types";
import { speakRussian } from "@/utils/speech";

interface Props {
  card: Flashcard;
}

export default function FlashcardCard({ card }: Props) {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <div className="text-xl font-bold text-blue-800 flex items-center gap-2">
          {card.russian}
          <button
            onClick={() => speakRussian(card.russian)}
            aria-label={`Play pronunciation of ${card.russian}`}
            className="text-sm px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            🔊
          </button>
        </div>
        {card.pos && (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
            {card.pos}
          </span>
        )}
      </div>

      <div className="text-gray-700 mb-1">
        <span className="font-semibold">English:</span> {card.english}
      </div>

      {card.meaning && (
        <div className="text-gray-700 mb-1">
          <span className="font-semibold">Meaning:</span> {card.meaning}
        </div>
      )}
    </div>
  );
}
