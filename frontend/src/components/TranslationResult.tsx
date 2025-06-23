import React from "react";
import { Translation } from "@/types";
import { speakRussian } from "@/utils/speech";

interface Props {
  translation: Translation;
  onSave?: (translation: Translation) => void;
}

export default function TranslationResult({ translation, onSave }: Props) {
  return (
    <div className="border rounded-2xl p-4 mb-4 shadow-sm bg-white hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <div className="text-xl font-bold text-blue-800 flex items-center gap-2">
          {translation.russian}
          <button
            onClick={() => speakRussian(translation.russian)}
            aria-label={`Play pronunciation of ${translation.russian}`}
            className="text-sm px-2 py-1 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            🔊
          </button>
        </div>
        {onSave && (
          <button
            onClick={() => onSave(translation)}
            className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 transition"
          >
            ⭐ Save
          </button>
        )}
      </div>

      {translation.glosses.length > 0 && (
        <div className="text-gray-700 mb-1">
          <span className="font-semibold">Meaning:</span>{" "}
          {translation.glosses.join(", ")}
        </div>
      )}

      {translation.synonyms.length > 0 && (
        <div className="text-gray-700 mb-1">
          <span className="font-semibold">Synonyms:</span>{" "}
          {translation.synonyms.join(", ")}
        </div>
      )}

      <div className="text-sm text-gray-600 flex flex-wrap gap-3 mt-2">
        {translation.pos && (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
            {translation.pos}
          </span>
        )}
        {translation.aspect && (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
            {translation.aspect}
          </span>
        )}
        {typeof translation.frequency === "number" && (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
            freq: {translation.frequency}
          </span>
        )}
      </div>
    </div>
  );
}
