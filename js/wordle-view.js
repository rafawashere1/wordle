import { Wordle } from './wordle.js';
import { WordleLines } from './wordle-lines.js';
import { LetterValidation } from './letter-validation.js';
import { Utils } from './utils.js';
class WordleView {
    constructor() {
        this.game = new Wordle();
        this.wordleLines = new WordleLines();
        this.setEvents();
    }
    setEvents() {
        const keyboard = document.querySelector('.keyboard');
        if (!keyboard)
            return;
        const buttons = keyboard.querySelectorAll('.key');
        buttons.forEach(button => {
            if (!['btnEnter', 'btnReset', 'btnBackspace'].includes(button.id)) {
                button.addEventListener('click', () => this.typeLetter(button.textContent || ''));
            }
        });
        const btnEnter = document.querySelector('#btnEnter');
        if (btnEnter)
            btnEnter.addEventListener('click', this.validateWord.bind(this));
        const btnClear = document.querySelector('#btnBackspace');
        if (btnClear)
            btnClear.addEventListener('click', () => this.DeleteLetter());
        const btnReset = document.querySelector('#btnReset');
        if (btnReset)
            btnReset.addEventListener('click', () => this.resetGame());
    }
    resetGame() {
        this.game = new Wordle();
        this.wordleLines = new WordleLines();
        this.wordleLines.clear();
        this.wordleLines.currentLineIndex = 0;
        const btnReset = document.getElementById('reset');
        if (btnReset)
            btnReset.style.display = 'none';
        this.resetKeyboardColor();
        this.enableKeyboard();
    }
    resetKeyboardColor() {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            if (key instanceof HTMLButtonElement) {
                key.classList.remove('correct-letter');
                key.classList.remove('incorrect-position');
                key.style.backgroundColor = '';
                key.style.color = 'White';
            }
        });
    }
    DeleteLetter() {
        this.wordleLines.backspace();
    }
    validateWord() {
        if (this.wordleLines.currentIndex !== 5)
            return;
        const fullWord = this.wordleLines.getFullWord();
        const validations = this.game.validateLetter(fullWord);
        this.wordleLines.colorLines(validations, this.game.secretWord, fullWord);
        this.colorKeyboardKeys(validations);
        this.game.attempts++;
        this.wordleLines.currentLineIndex++;
        this.wordleLines.currentIndex = 0;
        if (this.game.playerWon(fullWord) || this.game.playerLost()) {
            this.showNotification(this.game.playerWon(fullWord));
        }
    }
    colorKeyboardKeys(validations) {
        const letterButtons = document.querySelectorAll('.key');
        validations.forEach((validation, i) => {
            const letter = this.wordleLines.getFullWord()[i].toUpperCase();
            const selectedButton = Array.from(letterButtons).find(button => {
                const buttonLetter = button.getAttribute('data-letter');
                return buttonLetter && Utils.areLettersEqualWithoutAccent(buttonLetter, letter);
            });
            if (selectedButton instanceof HTMLButtonElement && !selectedButton.classList.contains('correct-letter')) {
                switch (validation) {
                    case LetterValidation.Correct:
                        selectedButton.classList.remove('incorrect-position');
                        selectedButton.classList.add('correct-letter');
                        break;
                    case LetterValidation.IncorrectPosition:
                        selectedButton.classList.add('incorrect-position');
                        break;
                    case LetterValidation.NonExistent:
                        selectedButton.style.backgroundColor = '#594B4F';
                        selectedButton.style.color = '#6E5C62';
                        break;
                    default:
                        selectedButton.style.backgroundColor = '';
                        break;
                }
            }
        });
    }
    showNotification(playerWon) {
        const notification = document.getElementById('notification');
        const btnRestart = document.getElementById('reset');
        if (!notification || !btnRestart)
            return;
        const message = playerWon
            ? 'Parabéns, você venceu!'
            : `Infelizmente, você perdeu. A palavra era ${this.game.secretWord}!`;
        notification.classList.add(playerWon ? 'notification-correct' : 'notification-error');
        notification.innerHTML = message;
        notification.style.display = 'block';
        btnRestart.style.display = 'block';
        btnRestart.addEventListener('click', () => {
            notification.style.display = 'none';
            this.resetGame();
        });
        this.disableKeyboard();
    }
    typeLetter(letter) {
        this.wordleLines.type(letter);
    }
    enableKeyboard() {
        const buttons = document.querySelectorAll('.keyboard .key');
        buttons.forEach(button => button.removeAttribute('disabled'));
    }
    disableKeyboard() {
        const buttons = document.querySelectorAll('.keyboard .key');
        buttons.forEach(button => button.setAttribute('disabled', 'true'));
    }
}
window.addEventListener('load', () => new WordleView());
//# sourceMappingURL=wordle-view.js.map