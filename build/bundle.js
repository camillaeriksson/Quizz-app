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
    welcome: `After a long night out the drunk robot and his friends are trying to get into one last bar. The doorman asks the robot how many drinks he had, but even though his CPU works as hard as it can, the robot can’t remember. Help him answer the doorman correctly!`,
    guess: `The robot drank between 1 and ${maxNum}. What's your guess?`,
    higher: `- *hick**blip blop* No, that can’t be right... It must be more!`,
    lower: `-*beep beep boop* No, that can’t be right... It must be less!`,
    invalidGuess: `Your guess is invalid, enter a number between 1 and ${maxNum}.`,
    correct: `CORRECT! 
  -"That few?!?! That wasn’t many at all. Welcome inside to have some more!”, the doorman says.`
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
function startGameSaveInput() {
    let playerName = document.getElementById("playerName");
    if (playerName !== null) {
        playerName.value;
        console.log(playerName);
    }
}
function playGameSaveInput() {
    let playerGuess = document.getElementById("playerGuess");
    if (playerGuess !== null) {
        playerGuess.value;
        console.log(playerGuess);
    }
}
function startGameSaveInput() {
    let playerName = document.getElementById("playerName");
    if (playerName !== null) {
        playerName.value;
        console.log(playerName);
    }
}
function playGameSaveInput() {
    let playerGuess = document.getElementById("playerGuess");
    if (playerGuess !== null) {
        playerGuess.value;
        console.log(playerGuess);
    }
}
//# sourceMappingURL=bundle.js.map