"use strict";
window.onload = init;
let gameStart = false;
function init() {
    const maxNum = 100;
    const gameText = {
        welcome: `Welcome to the fantastic Guess The Number game. The objective is to guess what number the guess robot is thinking of.`,
        guess: `The guess robot is thinking of a number between 0 and ${maxNum}. What's your guess?`,
        higher: `The robot is thinking of a higher number than your guess. Guess again.`,
        lower: `The robot is thinking of a lower number than your guess. Guess again`,
        invalidGuess: `Your guess is invalid, enter a number between 0 and ${maxNum}.`,
        correct: `Victory!!! You outsmarted the guess robot and guessed the correct number in `,
        playAgain: `Play again? Y/N?`
    };
    robotInstructions(gameText.welcome, false, ".robotInstructions");
    robotInstructions(gameText.guess, false, ".robotClues");
    const guessBot = new GuessBot(maxNum);
}
function gameLoop(guessBot, gameText) {
    let nGuesses = 0;
    let gameOver = false;
    let input = "";
}
function robotInstructions(gameText, trim, nameOfClass) {
    const gameTextSelector = document.querySelector(nameOfClass);
    if (gameTextSelector !== null) {
        if (trim) {
            gameTextSelector.innerHTML = gameText.toLowerCase().trim();
        }
        else {
            gameTextSelector.innerHTML = gameText;
        }
    }
}
class GuessBot {
    constructor(maxNumber) {
        this.pickANumber = () => {
            this.secretNumber = Math.floor(Math.random() * this.maxNumber);
            return this.secretNumber;
        };
        this.checkGuess = (guess) => guess < this.secretNumber ? 1 : guess > this.secretNumber ? -1 : 0;
        this.maxNumber = maxNumber;
        this.secretNumber = this.pickANumber();
    }
}
//# sourceMappingURL=bundle.js.map