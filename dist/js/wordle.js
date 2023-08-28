import { LetterValidation } from "./letter-validation.js";
import { Utils } from "./utils.js";
export class Wordle {
    constructor() {
        this.secretWord = this.getRandomWord();
        this.attempts = 0;
    }
    validateLetter(word) {
        const validations = new Array(word.length);
        for (let i = 0; i < word.length; i++) {
            if (Utils.areLettersEqualWithoutAccent(word[i], this.secretWord[i])) {
                validations[i] = LetterValidation.Correct;
            }
            else {
                let found = false;
                for (const char of this.secretWord) {
                    if (Utils.areLettersEqualWithoutAccent(word[i], char)) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    validations[i] = LetterValidation.IncorrectPosition;
                }
                else {
                    validations[i] = LetterValidation.NonExistent;
                }
            }
        }
        return validations;
    }
    playerWon(word) {
        return Utils.areLettersEqualWithoutAccent(word, this.secretWord);
    }
    playerLost() {
        return this.attempts == 5;
    }
    getRandomWord() {
        const words = [
            "MELÃO",
        ];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }
}
window.addEventListener('load', () => new Wordle());
//# sourceMappingURL=wordle.js.map