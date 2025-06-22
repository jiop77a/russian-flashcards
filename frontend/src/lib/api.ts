const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
import { Translation, Flashcard } from "@/types";

export async function fetchTranslations(
  word: string
): Promise<{ translations: Translation[] }> {
  const res = await fetch(
    `${API_BASE}/translate?word=${encodeURIComponent(word)}`
  );
  if (!res.ok) throw new Error("Failed to fetch translations");
  return res.json();
}

export async function saveTranslation(word: string, t: Translation) {
  const res = await fetch(`${API_BASE}/flashcards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      english: word,
      russian: t.russian,
      meaning: t.glosses.join(", "),
      pos: t.pos,
    }),
  });

  if (!res.ok) throw new Error("Failed to save flashcard");
  return res.json();
}

export async function fetchFlashcards(): Promise<Flashcard[]> {
  const res = await fetch(`${API_BASE}/flashcards`);
  if (!res.ok) {
    throw new Error("Failed to fetch flashcards");
  }
  return res.json();
}
