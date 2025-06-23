export function speakRussian(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  speechSynthesis.speak(utterance);
}
