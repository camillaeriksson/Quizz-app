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
const maxNum = 100;
let nGuesses = 1;
const guessBot = new GuessBot(maxNum);
let gamePage;
const gameText = {
    welcome: `After a long night out the drunk robot and his friends are trying to get into one last bar. 
  The doorman asks the robot how many drinks he had, but even though his CPU works as hard as it can, 
  the robot can’t remember. Help him answer the doorman correctly!`,
    guess: `The robot had between 1 to ${maxNum} drinks. What's your guess?`,
    higher: `- *hick**blip blop* No, that can’t be right... It must be more!`,
    lower: `-*beep beep boop* No, that can’t be right... It must be less!`,
    invalidGuess: `Your guess is invalid, enter a number between 1 and ${maxNum}.`,
    correct: `guesses! That wasn’t many at all. Welcome inside to have some more!”, the doorman says.`
};
function init() {
    showPage(GamePage.StartPage);
    document.addEventListener("keydown", e => handleKeypress(e));
}
function handleKeypress(e) {
    if (e.keyCode === 13) {
        switch (gamePage) {
            case GamePage.StartPage:
                startGameSaveInput();
                break;
            case GamePage.PlayPage:
                getPlayerInput();
                break;
            case GamePage.EndPage:
                showPage(GamePage.StartPage);
                break;
        }
        inputFocus();
    }
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
    const gameTextSelector = document.querySelector(".gameMessage");
    let playerInputField = document.querySelector(".playerInput");
    if (playerInputField !== null) {
        guess = Number(playerInputField.value);
        localStorage.setItem("score", nGuesses.toString());
        if (!isNaN(guess)) {
            nGuesses++;
            const sign = guessBot.checkGuess(guess);
            switch (sign) {
                case -1:
                    gameTextSelector.innerHTML = gameText.lower;
                    break;
                case 1:
                    gameTextSelector.innerHTML = gameText.higher;
                    break;
                default:
                    showPage(GamePage.EndPage);
            }
        }
        else if (isNaN(guess)) {
            gameTextSelector.innerHTML = gameText.invalidGuess;
        }
    }
    playerInputField.value = "";
    console.log(guess);
}
function startGameSaveInput() {
    let playerName = document.getElementById("playerName");
    if (playerName !== null) {
        localStorage.setItem("playerName", playerName.value);
    }
    showPage(GamePage.PlayPage);
}
function createStartPage() {
    gamePage = GamePage.StartPage;
    const mainWrapper = clearMainWrapper();
    const markup = `
    <div class="title">THE DRUNK ROBOT</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/easy.png" alt="" class="images" />
        <h3 class="difficulty">Tipsy</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/medium.png" alt="" class="images" />
        <h3 class="difficulty">Hammered</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/hard.png" alt="" class="images" />
        <h3 class="difficulty">Shitfaced</h3>
      </div>
    </div>

    <div class="rules">
      <div class="robotInstructions">${gameText.welcome}</div>
    </div>

    <div class="player_input">
      <input id="playerName" type="text" placeholder="enter your name" autofocus/>
      <button onclick="startGameSaveInput(); inputFocus(); " id="player_input">
        START
      </button>
    </div>
  `;
    mainWrapper.innerHTML = markup;
}
function createPlayPage() {
    gamePage = GamePage.PlayPage;
    const mainWrapper = clearMainWrapper();
    const playerName = localStorage.getItem("playerName");
    const markup = `
    <div class="title_game"></div>

    <div class="robotGreetings">"Greetings ${playerName}!"</div>
    <div class="gameMessage">${gameText.guess}</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/hard.png" alt="" class="images_game" />
      </div>
    </div>

    <div class="player_input">
      <div class="gameMessage">${gameText.guess}</div>
      <input class="playerInput" type="text" placeholder="enter your guess" autofocus/>
      <button class="playGame" onclick="getPlayerInput(); inputFocus();">
        <h2>PLAY</h2>
      </button>
    </div>
  `;
    mainWrapper.innerHTML = markup;
}
function createEndPage() {
    gamePage = GamePage.EndPage;
    const mainWrapper = clearMainWrapper();
    connectUsernameWithGuesses();
    let totalGuesses = localStorage.getItem("score");
    const markup = `
    <div class="title_ender">
      <H2>YOU WON!</H2>
    </div>
    
    <div class="bot_choice"></div>

    <div class="high_score">
      <div class="gameEndMessage"> "Only ${totalGuesses} ${gameText.correct}</div>
      <h2>HIGHEST SCORES</h2>
      <div class="user_and_score">
      <ul class="ul_highscores">
      </div>
    </div>
  
    <button class="startAgain" onclick="showPage(GamePage.StartPage)">PLAY AGAIN</button>
  `;
    nGuesses = 1;
    mainWrapper.innerHTML = markup;
    const ulHighScores = document.querySelector('.ul_highscores');
    console.log(ulHighScores);
    let listOfHighScores = JSON.parse(localStorage.getItem("highscore") || "");
    listOfHighScores.forEach((element) => {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(element.name + " " + element.totalGuesses);
        console.log(textnode);
        node.appendChild(textnode);
        ulHighScores.appendChild(node);
    });
}
function inputFocus() {
    const playerInput = document.querySelector('.playerInput');
    playerInput.focus();
}
function clearMainWrapper() {
    const mainWrapper = document.querySelector(".main_wrapper");
    mainWrapper.innerHTML = "";
    return mainWrapper;
}
function connectUsernameWithGuesses() {
    let name = localStorage.getItem("playerName") || "";
    let totalGuesses = localStorage.getItem("score") || "";
    const highscore = localStorage.getItem("highscore") || "[]";
    const playerObject = {
        name,
        totalGuesses
    };
    const highscores = [...JSON.parse(highscore), playerObject]
        .sort((a, b) => a.totalGuesses - b.totalGuesses)
        .slice(0, 5);
    localStorage.setItem("highscore", JSON.stringify(highscores));
    highscores.push(name);
    highscores.push(totalGuesses);
}
//# sourceMappingURL=bundle.js.map