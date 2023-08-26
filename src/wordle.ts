import { LetterValidation } from "./letter-validation.js";

export class Wordle {

  secretWord: string;
  attempts: number;

  constructor() {
    this.secretWord = this.getRandomWord();
    this.attempts = 0;
  }

  validateLetter(word: string): LetterValidation[] {
    const validations: LetterValidation[] = new Array<LetterValidation>(word.length);
  
    for (let i = 0; i < word.length; i++) {
      if (this.areLettersEqualWithoutAccent(word[i], this.secretWord[i])) {
        validations[i] = LetterValidation.Correct;
      } else {
        let found = false;
        for (const char of this.secretWord) {
          if (this.areLettersEqualWithoutAccent(word[i], char)) {
            found = true;
            break;
          }
        }
        if (found) {
          validations[i] = LetterValidation.IncorrectPosition;
        } else {
          validations[i] = LetterValidation.NonExistent;
        }
      }
    }
  
    return validations;
  }

  playerWon(word: string): boolean {
    return this.areLettersEqualWithoutAccent(word, this.secretWord);
  }

  playerLost(): boolean {
    return this.attempts == 5;
  }

  getRandomWord(): string {
    const words: string[] = [

      "MELÃO",
      "MOLHO"
    ];

    const randomIndex: number = Math.floor(Math.random() * words.length);

    return words[randomIndex];
  }

  areLettersEqualWithoutAccent(letter1: string, letter2: string): boolean {
    const normalize = (s: string) =>
        s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return normalize(letter1).toLowerCase() === normalize(letter2).toLowerCase();
  }

  normalizeLetterWithoutAccent(letter: string): string {
    return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
}

window.addEventListener('load', () => new Wordle());