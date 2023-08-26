import { LetterValidation } from "./letter-validation.js";
export class WordleLines {
    constructor() {
        this.lineLetters = [];
        this.currentIndex = 0;
        this.letters = [];
        this.currentLineIndex = 0;
        const divsLetters = document.querySelectorAll('.grid-wordle .line .letter');
        divsLetters.forEach((div) => this.letters.push(div));
        this.getLineLetters();
    }
    getLineLetters() {
        for (let i = 0; i < 5; i++) {
            const lineLetters = [];
            for (let j = 0; j < 5; j++) {
                const letterId = `line${i}-letter${j}`;
                const letterElement = document.getElementById(letterId);
                lineLetters.push(letterElement);
            }
            this.lineLetters.push(lineLetters);
        }
    }
    get isFilled() {
        return this.currentIndex === 5;
    }
    type(letter) {
        if (this.isFilled) {
            return;
        }
        const currentLineId = `line${this.currentLineIndex}`;
        const currentLetterId = `${currentLineId}-letter${this.currentIndex}`;
        const currentLetter = document.getElementById(currentLetterId);
        currentLetter.textContent = letter;
        this.currentIndex++;
    }
    getFullWord() {
        const currentLine = this.lineLetters[this.currentLineIndex];
        let fullWord = '';
        for (let j = 0; j < currentLine.length; j++) {
            fullWord += currentLine[j].textContent;
        }
        return fullWord;
    }
    colorLines(validations, secretWord, word) {
        const lineIndex = this.currentLineIndex;
        for (let i = 0; i < validations.length; i++) {
            const selectedLetter = this.lineLetters[lineIndex][i];
            switch (validations[i]) {
                case LetterValidation.Correct:
                    selectedLetter.style.backgroundColor = '#3AA394';
                    selectedLetter.textContent = secretWord[i];
                    break;
                case LetterValidation.IncorrectPosition:
                    selectedLetter.style.backgroundColor = '#D3AD69';
                    break;
                case LetterValidation.NonExistent:
                    selectedLetter.style.backgroundColor = '#312A2C';
                    break;
            }
        }
    }
    backspace() {
        if (this.currentIndex <= 0)
            return;
        this.currentIndex--;
        const currentLine = this.lineLetters[this.currentLineIndex];
        const selectedLetter = currentLine[this.currentIndex];
        selectedLetter.textContent = '';
    }
    clear() {
        this.currentIndex = 0;
        this.letters.forEach((label) => {
            label.textContent = '';
            label.style.backgroundColor = '#615458';
        });
    }
}
window.addEventListener('load', () => new WordleLines());
//# sourceMappingURL=wordle-lines.js.map