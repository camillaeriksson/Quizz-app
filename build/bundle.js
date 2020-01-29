"use strict";
class GuessBot {
    constructor(maxNumber) {
        this.pickANumber = () => {
            this.secretNumber = Math.floor((Math.random() + 1) * this.maxNumber);
            console.log(this.secretNumber);
            return this.secretNumber;
        };
        this.setMaxNum = (range) => {
            this.maxNumber = range;
        };
        this.getMaxNum = () => { return this.maxNumber; };
        this.checkGuess = (guess) => guess < this.secretNumber ? 1 : guess > this.secretNumber ? -1 : 0;
        this.maxNumber = maxNumber;
        this.secretNumber = this.pickANumber();
    }
}
class PlayerBot {
    constructor(maxNumber) {
        this.lastGuess = -1;
        this.smartGuess = (sign, lastGuess) => {
            let guess;
            if (sign === 0) {
                this.low = 1;
                this.high = this.maxNumber;
                guess = Math.floor((this.high - this.low) / 2) + 1;
                this.lastGuess = guess;
                return guess;
            }
            lastGuess ? (this.lastGuess = lastGuess) : null;
            if (sign === 1) {
                this.low = this.lastGuess;
                const diff = this.high - this.lastGuess;
                const x = Math.floor(diff / 2);
                guess = this.lastGuess + (diff <= 1 ? diff : x);
                this.lastGuess = guess;
                return guess;
            }
            else {
                this.high = this.lastGuess;
                const x = Math.floor((this.high - this.low) / 2);
                guess = this.lastGuess - x;
                this.lastGuess = guess;
                return guess;
            }
        };
        this.stupidGuess = (sign, lastGuess) => {
            let guess;
            if (sign === 0) {
                this.low = 1;
                this.high = this.maxNumber;
                guess = Math.floor(Math.random() * this.high) + 1;
                this.lastGuess = guess;
                return guess;
            }
            lastGuess ? (this.lastGuess = lastGuess) : null;
            if (sign === 1) {
                this.low = this.lastGuess;
                guess =
                    this.lastGuess +
                        Math.floor(Math.random() * (this.high - this.lastGuess) + 1);
                this.lastGuess = guess;
                return guess > this.high ? this.high : guess;
            }
            else {
                this.high = this.lastGuess;
                guess =
                    this.lastGuess -
                        Math.floor(Math.random() * (this.high - this.low) + 1);
                this.lastGuess = guess;
                return guess < this.low ? this.low : guess;
            }
        };
        this.retardedGuess = () => {
            let guess;
            const chance = Math.random();
            if (chance > 0.6) {
                guess = "bip bop";
                return guess;
            }
            guess = Math.floor(Math.random() * this.maxNumber) + 1;
            return guess;
        };
        this.maxNumber = maxNumber;
        this.low = 1;
        this.high = maxNumber;
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
let nGuesses = 1;
let gamePage;
let multiplayerMode = false;
const range = {
    easy: 10,
    medium: 50,
    hard: 100,
};
const guessBot = new GuessBot(range.easy);
const gameText = {
    welcome: `After a long night out the drunk robot and his friends are trying to get into one last bar. 
  The doorman asks the robot how many drinks he had, but even though his CPU works as hard as it can, 
  the robot can’t remember. Help him answer the doorman correctly!`,
    higher: `- *hick**blip blop* No, that can’t be right... It must be <b>more</b>!`,
    lower: `-*beep beep boop* No, that can’t be right... It must be <b>less</b>!`,
    correct: `drinks! That wasn’t many at all. Welcome inside to have some more!”, the doorman says.`,
    getGuessText: function (range, isValid) {
        let text = `errr....**!!!..error.., enter a number between 1 and ${range}.`;
        if (isValid) {
            text = `The robot had between 1 to ${range} drinks. What's your guess?`;
        }
        return text;
    }
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
    inputFocus();
    removeGreetings();
    const gameTextSelector = document.querySelector(".gameMessage");
    const playerInputField = document.querySelector(".playerInput");
    const gameImage = document.querySelector(".images_game");
    gameTextSelector.classList.add("wobble");
    setTimeout(function () {
        gameTextSelector.classList.remove("wobble");
    }, 2000);
    if (playerInputField !== null) {
        guess = playerInputField.value || "invalid";
        localStorage.setItem("score", nGuesses.toString());
        if (!isNaN(guess)) {
            nGuesses++;
            const sign = guessBot.checkGuess(guess);
            switch (sign) {
                case -1:
                    gameImage.src = getImageSource('lower.png');
                    gameTextSelector.innerHTML = gameText.lower;
                    break;
                case 1:
                    gameImage.src = getImageSource('higher.png');
                    gameTextSelector.innerHTML = gameText.higher;
                    break;
                default:
                    showPage(GamePage.EndPage);
            }
        }
        else if (isNaN(guess)) {
            gameImage.src = getImageSource('invalid.png');
            gameTextSelector.innerHTML = gameText.getGuessText(guessBot.getMaxNum(), false);
        }
    }
    playerInputField.value = "enter your guess";
    console.log(guess);
}
function startGameSaveInput() {
    const playerName = document.getElementById("playerName");
    if (playerName !== null) {
        localStorage.setItem("playerName", playerName.value);
    }
    showPage(GamePage.PlayPage);
    inputFocus();
}
function changeModeToBot() {
    multiplayerMode = true;
    const modeButtons = document.querySelectorAll('.modeButtons button');
    modeButtons[1].style.outline = 'solid';
    modeButtons[0].style.outline = 'unset';
}
function changeModeToSingle() {
    multiplayerMode = false;
    const modeButtons = document.querySelectorAll('.modeButtons button');
    modeButtons[0].style.outline = 'solid';
    modeButtons[1].style.outline = 'unset';
}
function createStartPage() {
    const oldPlayerName = localStorage.getItem('playerName');
    gamePage = GamePage.StartPage;
    const mainWrapper = clearMainWrapper();
    const markup = `
    <div class="title">DRUNK BOTS</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/easy_begin.png" alt="" 
        title = "Im Tipsy, I drank between 1 to 10 drinks"
        class="images" id="imgEasy" />
        <h3 class="difficulty">Tipsy</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/medium_begin.png" alt="" 
        title = "Im Hammered, I drank between 1 to 50 drinks"
        class="images" id="imgMedium" />
        <h3 class="difficulty">Hammered</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/hard_begin.png" alt="" 
        title = "Im Sloshed, I drank between 1 to 100 drinks"
        class="images" id="imgHard"/>
        <h3 class="difficulty">Sloshed</h3>
      </div>
    </div>

    <div class="rules">
    <div class="robotInstructions">${gameText.welcome}</div>
  </div>
  <div class="player_input">
    <input id="playerName" type="text" placeholder="enter your name" autofocus/>
    <div class="modeButtons">
    <button onclick="changeModeToSingle()" class="background-1">Single player</button><button onclick="changeModeToBot()" class="background-1">Against bot</button>
    </div>
    <button onclick="startGameSaveInput(); inputFocus(); " id="player_input" class="background-2">start</button>

  </div>
  `;
    mainWrapper.innerHTML = markup;
    botSelection();
    const playerName = document.getElementById("playerName");
    if (oldPlayerName !== null) {
        playerName.value = oldPlayerName;
    }
}
function createPlayPage() {
    guessBot.pickANumber();
    gamePage = GamePage.PlayPage;
    const mainWrapper = clearMainWrapper();
    const playerName = localStorage.getItem("playerName");
    const markup = `
    <div class="robotGreetings">"Greetings ${playerName}!"</div>
    <div class="gameMessage">${gameText.getGuessText(guessBot.getMaxNum(), true)}</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src=${getImageSource('begin.png')} alt="" class="images_game" />
      </div>
    </div>

    <div class="player_input">

    <input required class="playerInput" type="number" placeholder="enter your guess" autofocus/>
      </button><button onclick="getPlayerInput();" class="button-round background-5 playGame">Submit</button>

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
    <h2>YOU WON!</h2><br>
    </div>
    <p>You took ${totalGuesses} guesses.</p>
    <img src=${getImageSource('win.gif')} alt="" class="images_game" />
    <div class="high_score">
      <div class="gameEndMessage"> "Only ${guess} ${gameText.correct}</div>
      <div class="user_and_score">
      <h2>HIGHEST SCORES</h2>
      <ul class="ul_highscores">
      </div>
  
    </div>
  
    <button onclick="showPage(GamePage.StartPage);" id="player_input" class=" background-2">Restart</button>

  `;
    nGuesses = 1;
    mainWrapper.innerHTML = markup;
    const highscoreDiv = document.querySelector(".user_and_score");
    const ulHighScores = document.querySelector(".ul_highscores");
    let listOfHighScores = JSON.parse(localStorage.getItem("highscore") || "");
    listOfHighScores.forEach((element) => {
        let node = document.createElement("LI");
        let textnode = document.createTextNode(element.name + " " + element.totalGuesses);
        node.appendChild(textnode);
        ulHighScores.appendChild(node);
    });
    if (multiplayerMode === true) {
        highscoreDiv.style.display = "none";
    }
}
function inputFocus() {
    const playerInput = document.querySelector(".playerInput");
    if (playerInput) {
        playerInput.focus();
    }
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
        .slice(0, 3);
    localStorage.setItem("highscore", JSON.stringify(highscores));
    highscores.push(name);
    highscores.push(totalGuesses);
}
function removeGreetings() {
    var _a;
    const greetings = document.querySelector('.robotGreetings');
    (_a = greetings) === null || _a === void 0 ? void 0 : _a.remove();
}
function botSelection() {
    let botSelected = document.querySelector(".bot_choice");
    let imageList = document.querySelectorAll(".images");
    console.log(imageList);
    botSelected.onclick = function (e) {
        switch (e.toElement.id) {
            case 'imgEasy':
                guessBot.setMaxNum(range.easy);
                imageList[0].style.background = "#f6d535";
                imageList[1].style.background = "unset";
                imageList[2].style.background = "unset";
                break;
            case 'imgMedium':
                guessBot.setMaxNum(range.medium);
                imageList[0].style.background = "unset";
                imageList[1].style.background = "#f6d535";
                imageList[2].style.background = "unset";
                break;
            case 'imgHard':
                guessBot.setMaxNum(range.hard);
                imageList[0].style.background = "unset";
                imageList[1].style.background = "unset";
                imageList[2].style.background = "#f6d535";
                break;
        }
    };
}
function getImageSource(imageName) {
    let path = `./assets/images/easy_${imageName}`;
    if (guessBot.getMaxNum() === range.medium) {
        path = `./assets/images/medium_${imageName}`;
    }
    else if (guessBot.getMaxNum() === range.hard) {
        path = `./assets/images/hard_${imageName}`;
    }
    return path;
}
//# sourceMappingURL=bundle.js.map