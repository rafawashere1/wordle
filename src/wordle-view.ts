import { Wordle } from './wordle.js';
import { WordleLines } from './wordle-lines.js'
import { LetterValidation } from './letter-validation.js'

class WordleView {
    game: Wordle;
    wordleLines: WordleLines;

    constructor() {
        this.game = new Wordle();
        this.wordleLines = new WordleLines();

        this.setEvents();
    }

    setEvents(): void {
        const keyboard = document.querySelector('.keyboard');
        if (keyboard) {
            const buttons = keyboard.querySelectorAll('.key');

            buttons.forEach(button => {
                if (button.id === 'btnEnter' || button.id === 'btnReset' || button.id === 'btnBackspace') {
                    return;
                }

                button.addEventListener('click', () => this.typeLetter(button.textContent || ''));
            });

            const btnEnter = document.querySelector('#btnEnter');
            if (btnEnter) {
                btnEnter.addEventListener('click', this.validateWord.bind(this));
            }

            const btnClear = document.querySelector('#btnBackspace');
            if (btnClear) {
                btnClear.addEventListener('click', () => this.DeleteLetter());
            }

            const btnReset = document.querySelector('#btnReset');
            if (btnReset) {
                btnReset.addEventListener('click', () => this.resetGame());
            }
        }
    }

    resetGame(): void {
        this.game = new Wordle();
        this.wordleLines = new WordleLines();
        this.wordleLines.clear();

        this.wordleLines.currentLineIndex = 0;

        const btnReset = document.getElementById('reset');
        if (btnReset) {
            btnReset.style.display = 'none';
        }

        this.resetKeyboardColor();
        this.enableKeyboard();
    }

    resetKeyboardColor(): void {
        const keyboard = document.querySelector('.keyboard');

        if (keyboard) {
            const keys = keyboard.querySelectorAll('.key');
            keys.forEach(key => {
                if (key instanceof HTMLButtonElement) {
                    key.style.backgroundColor = '#4C4347';
                }
            });
        }
    }

    DeleteLetter(): void {
        this.wordleLines.backspace();
    }

    validateWord(): void {
        if (this.wordleLines.currentIndex != 5) {
            return;
        }

        const fullWord = this.wordleLines.getFullWord();
        const validations: LetterValidation[] = this.game.validateLetter(fullWord);

        this.wordleLines.colorLines(validations);
        this.colorKeyboardKeys(validations);

        this.game.attempts++;
        this.wordleLines.currentLineIndex++;
        this.wordleLines.currentIndex = 0;

        if (this.game.playerWon(fullWord) || this.game.playerLost()) {
            const playerWon = this.game.playerWon(fullWord);
            this.showNotification(playerWon);
        }
    }

    colorKeyboardKeys(validations: LetterValidation[]): void {
        const letterButtons = document.querySelectorAll('.key');

        for (let i = 0; i < validations.length; i++) {
            const letter = this.wordleLines.getFullWord()[i].toUpperCase();
            const selectedButton = Array.from(letterButtons).find(button => button.getAttribute('data-letter') === letter);

            if (!selectedButton || !(selectedButton instanceof HTMLButtonElement)) {
                continue;
            }

            switch (validations[i]) {
                case LetterValidation.Correct:
                    selectedButton.style.backgroundColor = 'LawnGreen';
                    break;
                case LetterValidation.IncorrectPosition:
                    selectedButton.style.backgroundColor = 'Goldenrod';
                    break;
                case LetterValidation.NonExistent:
                    selectedButton.style.backgroundColor = 'Gray';
                    break;
                default:
                    selectedButton.style.backgroundColor = '';
                    break;
            }
        }
    }

    showNotification(playerWon: boolean): void {
        const notification = document.getElementById('notification');
        const btnRestart = document.getElementById('reset');

        if (notification && btnRestart) {
            if (playerWon) {
                notification.classList.add('notificacao-acerto');
                notification.innerHTML = 'Parabéns, você venceu! Deseja jogar novamente?';
            } else {
                notification.classList.add('notificacao-erro');
                notification.innerHTML = `Infelizmente, você perdeu. A palavra era ${this.game.secretWord}! Deseja jogar novamente?`;
            }

            notification.style.display = 'block';
            btnRestart.style.display = 'block';

            btnRestart.addEventListener('click', () => {
                notification.style.display = 'none';
                this.resetGame();
            });

            this.disableKeyboard();
        }
    }

    typeLetter(letter: string): void {
        this.wordleLines.type(letter);
    }

    enableKeyboard(): void {
        const keyboard = document.querySelector('.keyboard');
        if (keyboard) {
            const botoes = keyboard.querySelectorAll('.key');
            botoes.forEach(botao => {
                botao.removeAttribute('disabled');
            });
        }
    }

    disableKeyboard(): void {
        const keyboard = document.querySelector('.keyboard');
        if (keyboard) {
            const buttons = keyboard.querySelectorAll('.key');
            buttons.forEach(botao => {
                botao.setAttribute('disabled', 'true');
            });
        }
    }
}

window.addEventListener('load', () => new WordleView())