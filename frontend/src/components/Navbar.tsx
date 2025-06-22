import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          🇷🇺 Flashcard Translator
        </Link>
        <div className="space-x-4">
          <Link
            href="/"
            className="hover:underline hover:text-gray-200 transition"
          >
            Home
          </Link>
          <Link
            href="/flashcards"
            className="hover:underline hover:text-gray-200 transition"
          >
            Flashcards
          </Link>
        </div>
      </div>
    </nav>
  );
}
