import { LetterValidation } from "./letter-validation.js";
import { Utils } from "./utils.js";

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
      if (Utils.areLettersEqualWithoutAccent(word[i], this.secretWord[i])) {
        validations[i] = LetterValidation.Correct;
      } else {
        let found = false;
        for (const char of this.secretWord) {
          if (Utils.areLettersEqualWithoutAccent(word[i], char)) {
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
    return Utils.areLettersEqualWithoutAccent(word, this.secretWord);
  }

  playerLost(): boolean {
    return this.attempts == 5;
  }

  getRandomWord(): string {
    const words: string[] = [
      "MELÃO",
      "FOGÃO",
      "LIMÃO",
      "MÚMIA",
      "FÚTIL",
      "MOLHO",
      "QUEDA",
      "SALTO",
      "TAMPA",
      "VALOR",
    ];

    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
}

window.addEventListener('load', () => new Wordle());