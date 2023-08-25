import { LetterValidation } from "./letter-validation.js";
export class Wordle {
    constructor() {
        this.secretWord = this.getRandomWord();
        this.attempts = 0;
    }
    validateLetter(word) {
        const validations = new Array(word.length);
        for (let i = 0; i < word.length; i++) {
            if (word[i] === this.secretWord[i]) {
                validations[i] = LetterValidation.Correct;
            }
            else if (this.secretWord.includes(word[i])) {
                validations[i] = LetterValidation.IncorrectPosition;
            }
            else {
                validations[i] = LetterValidation.NonExistent;
            }
        }
        return validations;
    }
    playerWon(word) {
        return word == this.secretWord;
    }
    playerLost() {
        return this.attempts == 5;
    }
    getRandomWord() {
        const words = [
            "ABRIR",
            "AMIGO",
            "BEBER",
            "BOLDO",
            "CAIXA",
            "CASAL",
            "CORPO",
            "DEDOS",
            "DENTE",
            "DIZER",
            "ERROS",
            "FALAR",
            "FESTA",
            "FOGAO",
            "GANHO",
            "GIRAR",
            "GRITO",
            "HORAS",
            "JOGOS",
            "JULHO",
            "LIMAO",
            "LOUCO",
            "MAIOR",
            "MELAO",
            "MOLHO"
        ];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }
}
window.addEventListener('load', () => new Wordle());
//# sourceMappingURL=wordle.js.map