import { LetterValidation } from "./letter-validation.js";
export class Wordle {
    constructor() {
        this.secretWord = this.getRandomWord();
        this.attempts = 0;
    }
    validateLetter(word) {
        const validations = new Array(word.length);
        for (let i = 0; i < word.length; i++) {
            if (this.areLettersEqualWithoutAccent(word[i], this.secretWord[i])) {
                validations[i] = LetterValidation.Correct;
            }
            else {
                let found = false;
                for (const char of this.secretWord) {
                    if (this.areLettersEqualWithoutAccent(word[i], char)) {
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
        return this.areLettersEqualWithoutAccent(word, this.secretWord);
    }
    playerLost() {
        return this.attempts == 5;
    }
    getRandomWord() {
        const words = [
            "MELÃO",
            "FOGÃO",
            "LIMÃO",
            "MÚMIA",
            "FÚTIL",
            "MOLHO",
            "QUEDA",
            "SABOR",
            "SALTO",
            "TAMPA",
            "VALOR",
            "RISCO",
            "BOLHA",
            "PODER",
            "IGUAL",
            "CRIME",
            "FORTE",
            "MARCA",
            "BRUTO",
            "JUSTO",
            "MALHA",
            "PEDRA",
            "COMER",
            "DENTE",
            "LIXAR",
        ];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }
    areLettersEqualWithoutAccent(letter1, letter2) {
        const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return normalize(letter1).toLowerCase() === normalize(letter2).toLowerCase();
    }
    normalizeLetterWithoutAccent(letter) {
        return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
}
window.addEventListener('load', () => new Wordle());
//# sourceMappingURL=wordle.js.map