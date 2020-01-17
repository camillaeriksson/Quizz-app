"use strict";
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
window.onload = init;
let guess;
let gamePlaying = false;
const maxNum = 100;
let nGuesses = 0;
const guessBot = new GuessBot(maxNum);
let playerName = "ghost";
const gameText = {
    welcome: `Welcome to the fantastic Guess The Number game. The objective is to guess what number the guess robot is thinking of.`,
    guess: `The guess robot is thinking of a number between 0 and ${maxNum}. What's your guess?`,
    higher: `The robot is thinking of a higher number than your guess. Guess again.`,
    lower: `The robot is thinking of a lower number than your guess. Guess again`,
    invalidGuess: `Your guess is invalid, enter a number between 0 and ${maxNum}.`,
    correct: `Victory!!! You outsmarted the guess robot and guessed the correct number in `,
    playAgain: `Play again? Y/N?`
};
function init() {
    robotInstructions(gameText.welcome, false, ".robotInstructions");
    robotInstructions(gameText.guess, false, ".robotClues");
    playerName = localStorage.getItem("playerName") || "";
    robotInstructions("Greetings " + playerName + "!", false, ".robotGreetings");
    let NoOfGuesses = localStorage.getItem("NoOfGuesses") || "1";
    let winText = gameText.correct + " " + NoOfGuesses + " guesses.";
    robotInstructions(winText, false, ".robotEndMessage");
}
function getPlayerInput() {
    let playerInputField = document.querySelector(".playerInput");
    if (playerInputField !== null) {
        guess = Number(playerInputField.value);
        if (!isNaN(guess)) {
            nGuesses++;
            const sign = guessBot.checkGuess(guess);
            switch (sign) {
                case -1:
                    robotInstructions(gameText.lower, true, ".robotClues");
                    break;
                case 1:
                    robotInstructions(gameText.higher, true, ".robotClues");
                    break;
                default:
                    localStorage.setItem("NoOfGuesses", (nGuesses.toString()));
                    window.location.href = "./end_page.html";
            }
        }
        else if (isNaN(guess)) {
            robotInstructions(gameText.invalidGuess, true, ".robotClues");
        }
    }
    console.log(guess);
}
function welcomePlayer() {
    let playerNameField = document.querySelector(".playerName");
    if (playerNameField !== null) {
        playerName = playerNameField.value;
    }
    console.log(playerName);
    localStorage.setItem("playerName", playerName);
    runGame();
}
function runGame() {
    window.location.href = "./game.html";
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
    return gameText;
}
//# sourceMappingURL=bundle.js.map