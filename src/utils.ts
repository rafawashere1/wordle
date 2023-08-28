export class Utils {
  static areLettersEqualWithoutAccent(letter1: string, letter2: string): boolean {
    const normalize = (s: string) =>
      s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return normalize(letter1).toLowerCase() === normalize(letter2).toLowerCase();
  }

  static normalizeLetterWithoutAccent(letter: string): string {
    return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
}