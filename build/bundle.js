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
var GamePage;
(function (GamePage) {
    GamePage[GamePage["StartPage"] = 0] = "StartPage";
    GamePage[GamePage["PlayPage"] = 1] = "PlayPage";
    GamePage[GamePage["EndPage"] = 2] = "EndPage";
})(GamePage || (GamePage = {}));
window.onload = init;
let guess;
let gamePlaying = false;
const maxNum = 100;
let nGuesses = 0;
const guessBot = new GuessBot(maxNum);
let playerName = "ghost";
let button;
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
    showPage(GamePage.StartPage);
}
function showPage(gamePage) {
    switch (gamePage) {
        case GamePage.StartPage:
            createStartPage();
            break;
        case GamePage.PlayPage:
            createPlayPage();
            break;
        case GamePage.EndPage:
            createEndPage();
            break;
        default:
            createStartPage();
    }
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
                    localStorage.setItem("NoOfGuesses", nGuesses.toString());
                    showPage(GamePage.EndPage);
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
    showPage(GamePage.PlayPage);
}
function playGameSaveInput() {
    let playerGuess = document.getElementById("playerGuess");
    if (playerGuess !== null) {
        playerGuess.value;
        console.log(playerGuess);
    }
}
function createStartPage() {
    const mainWrapper = clearMainWrapper();
    const markup = `
    <div class="title">GAME'S NAME</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/easy.png" alt="" class="images" />
        <h3 class="difficulty">Easy</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/medium.png" alt="" class="images" />
        <h3 class="difficulty">Medium</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/hard.png" alt="" class="images" />
        <h3 class="difficulty">Hard</h3>
      </div>
    </div>

    <div class="rules">
      <h2>HOW TO PLAY</h2>
      <div class="robotInstructions"></div>
    </div>

    <div class="player_input">
      <input id="playerName" type="text" placeholder="enter your name" />
      <button onclick="startGameSaveInput()" id="player_input">
        START
      </button>
    </div>
  `;
    mainWrapper.innerHTML = markup;
}
function createPlayPage() {
    const mainWrapper = clearMainWrapper();
    const markup = `
    <div class="title_game"></div>

    <div class="robotGreetings"></div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/hard.png" alt="" class="images_game" />
      </div>
    </div>

    <div class="player_input">
      <div class="robotClues"></div>
      <input class="playerInput" type="text" placeholder="enter your guess" />
      <button class="playGame" onclick="getPlayerInput()">
        <h2>PLAY</h2>
      </button>
    </div>
  `;
    mainWrapper.innerHTML = markup;
}
function createEndPage() {
    const mainWrapper = clearMainWrapper();
    const markup = `
    <div class="title_ender">
      <H1>YOU WON!</H1>
    </div>
    
    <div class="bot_choice"></div>

    <div class="high_score">
      <h2>HIGHEST SCORES</h2>
      <div class="robotEndMessage"></div>
    </div>
  
    <button class="startAgain" onclick="showPage(GamePage.StartPage)">PLAY AGAIN</button>
  `;
    mainWrapper.innerHTML = markup;
}
function clearMainWrapper() {
    const mainWrapper = document.querySelector(".main_wrapper");
    mainWrapper.innerHTML = "";
    return mainWrapper;
}
//# sourceMappingURL=bundle.js.map