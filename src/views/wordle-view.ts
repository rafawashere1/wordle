import { Wordle } from './wordle';
import { WordleLines } from './wordle-lines'
import { LetterValidation } from './letter-validation'
import { Utils } from './utils';

export class WordleView {
    game: Wordle;
    wordleLines: WordleLines;

    constructor() {
        this.game = new Wordle();
        this.wordleLines = new WordleLines();
        this.setEvents();
    }

    setEvents(): void {
        const keyboard = document.querySelector('.keyboard');
        if (!keyboard) return;
    
        const buttons = keyboard.querySelectorAll('.key');
        buttons.forEach(button => {
            if (!['btnEnter', 'btnReset', 'btnBackspace'].includes(button.id)) {
                button.addEventListener('click', () => this.typeLetter(button.textContent || ''));
            }
        });
    
        const btnEnter = document.querySelector('#btnEnter');
        if (btnEnter) btnEnter.addEventListener('click', this.validateWord.bind(this));
    
        const btnClear = document.querySelector('#btnBackspace');
        if (btnClear) btnClear.addEventListener('click', () => this.DeleteLetter());
    
        const btnReset = document.querySelector('#btnReset');
        if (btnReset) btnReset.addEventListener('click', () => this.resetGame());
    }

    resetGame(): void {
        this.game = new Wordle();
        this.wordleLines = new WordleLines();
        this.wordleLines.clear();
        this.wordleLines.currentLineIndex = 0;
    
        const btnReset = document.getElementById('reset');
        if (btnReset) btnReset.style.display = 'none';
    
        this.resetKeyboardColor();
        this.enableKeyboard();
    }

    resetKeyboardColor(): void {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            if (key instanceof HTMLButtonElement) {
                key.classList.remove('correct-letter');
                key.classList.remove('incorrect-position');
                key.classList.remove('non-existent');
                key.style.backgroundColor = '';
                key.style.color = '';
            }
        });
    }

    DeleteLetter(): void {
        this.wordleLines.backspace();
    }

    validateWord(): void {
        if (this.wordleLines.currentIndex !== 5) return;
    
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

    colorKeyboardKeys(validations: LetterValidation[]): void {
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
                        selectedButton.classList.remove('non-existent');
                        selectedButton.classList.remove('incorrect-position');
                        selectedButton.classList.add('correct-letter');
                        selectedButton.style.color = '';
                        break;
                    case LetterValidation.IncorrectPosition:
                        selectedButton.classList.remove('correct-letter');
                        selectedButton.classList.remove('non-existent');
                        selectedButton.classList.add('incorrect-position');
                        selectedButton.style.color = '';
                        break;
                    case LetterValidation.NonExistent:
                        selectedButton.classList.remove('correct-letter');
                        selectedButton.classList.remove('incorrect-position');
                        selectedButton.classList.add('non-existent');
                        break;
                    default:
                        selectedButton.style.backgroundColor = '';
                        break;
                }
            }
        });
    }

    showNotification(playerWon: boolean): void {
        const notification = document.getElementById('notification');
        const btnRestart = document.getElementById('reset');
    
        if (!notification || !btnRestart) return;
    
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

    typeLetter(letter: string): void {
        this.wordleLines.type(letter);
    }

    enableKeyboard(): void {
        const buttons = document.querySelectorAll('.keyboard .key');
        buttons.forEach(button => button.removeAttribute('disabled'));
    }
    
    disableKeyboard(): void {
        const buttons = document.querySelectorAll('.keyboard .key');
        buttons.forEach(button => button.setAttribute('disabled', 'true'));
    }
}