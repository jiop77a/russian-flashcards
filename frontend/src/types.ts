export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "interjection"
  | "participle"
  | "particle"
  | "numeral"
  | "unknown";

export interface Translation {
  russian: string;
  glosses: string[];
  pos?: PartOfSpeech;
  aspect?: string;
  synonyms: string[];
  frequency?: number;
}

export interface Flashcard {
  id: number;
  english: string;
  russian: string;
  meaning?: string;
  pos?: PartOfSpeech;
}
