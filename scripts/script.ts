enum GamePage {
  StartPage,
  PlayPage,
  EndPage
}

enum Difficulty {
  Easy = 10,
  Medium = 50,
  Hard = 100
}

enum Sign {
  Lower = -1,
  Higher = 1,
  Correct = 0
}

window.onload = init;
let guess: number;
let sign: Sign;
let nGuesses: number = 0;
let botGuesses: number = 0;
let gamePage: GamePage;

let multiplayerMode: boolean = false;
let isLoading: boolean = false;
let isPlayersTurn: boolean = true;
let isGameOver: boolean = false;

let maxNum: Difficulty = Difficulty.Easy;
let guessBot: GuessBot;
let playerBot: PlayerBot;

const gameText = {
  welcome: `After a long night out the drunk robot and his friends are trying to get into one last bar. 
  The doorman asks the robot how many drinks he had, but even though his CPU works as hard as it can, 
  the robot can’t remember. Help him answer the doorman correctly!`,
  higher: `- *hick**blip blop* No, that can’t be right... It must be <b>more</b>!`,
  lower: `-*beep beep boop* No, that can’t be right... It must be <b>less</b>!`,
  correct: `drinks! That wasn’t many at all. Welcome inside to have some more!”, the doorman says.`,
  getGuessText: function(range: number, isValid: boolean): string {
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

function handleKeypress(e: KeyboardEvent) {
  if (e.keyCode === 13) {
    switch (gamePage) {
      case GamePage.StartPage:
        startGameSaveInput();
        break;
      case GamePage.PlayPage:
        if (isPlayersTurn) {
          takeTurn();
        }
        break;
      case GamePage.EndPage:
        showPage(GamePage.StartPage);
        break;
    }
    inputFocus();
  }
}

function showPage(gamePage: GamePage) {
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

function getPlayerInput(): number {
  inputFocus();
  removeGreetings();

  const playerInputField = document.querySelector(
    ".playerInput"
  ) as HTMLInputElement;

  if (playerInputField !== null) {
    const input = Number(playerInputField.value);
    playerInputField.value = "enter your guess";
    return input;
  }

  return NaN;
}

function showEndOfTurnMessage() {
  const gameTextSelector = document.querySelector(
    ".gameMessage"
  ) as HTMLDivElement;
  const gameImage = document.querySelector(".images_game") as HTMLImageElement;
  gameTextSelector.classList.add("wobble");
  gameTextSelector.style.display = "block";
  setTimeout(function() {
    gameTextSelector.classList.remove("wobble");
  }, 2000);

  if (!isNaN(guess)) {
    if (isPlayersTurn) {
      nGuesses++;
    } else {
      botGuesses++;
    }

    localStorage.setItem("score", nGuesses.toString());

    sign = guessBot.checkGuess(guess);
    switch (sign) {
      case Sign.Lower:
        gameImage.src = getImageSource("lower.png");
        gameTextSelector.innerHTML = gameText.lower;
        break;
      case Sign.Higher:
        gameImage.src = getImageSource("higher.png");
        gameTextSelector.innerHTML = gameText.higher;
        break;
      default:
        isGameOver = true;
        if (multiplayerMode && !isPlayersTurn) {
          gameTextSelector.innerHTML = "The bot guessed the correct number!";
          setTimeout(() => showPage(GamePage.EndPage), 3000);
        } else showPage(GamePage.EndPage);
    }
  } else if (isNaN(guess)) {
    gameImage.src = getImageSource("invalid.png");
    gameTextSelector.innerHTML = gameText.getGuessText(maxNum, false);
  }
}

function startGameSaveInput() {
  const playerName = document.getElementById("playerName") as HTMLInputElement;
  if (playerName !== null) {
    localStorage.setItem("playerName", playerName.value);
  }
  showPage(GamePage.PlayPage);
  isGameOver = false;

  playersTurn();
}

function takeTurn() {
  const inputWrapperElement = document.querySelector(
    ".player_input"
  ) as HTMLElement;

  if (isPlayersTurn) {
    guess = getPlayerInput();
    sign = guessBot.checkGuess(guess);

    showEndOfTurnMessage();
    if (multiplayerMode && !isGameOver) {
      isPlayersTurn = false;
      removePlayerInput();
      playerBot.updateAlgorithm(sign, guess);
      setTimeout(botsTurn, 2000);
    }
  } else {
    if (guess) {
      guess = playerBot.guess(sign, guess);
    } else {
      guess = playerBot.guess();
    }
    sign = guessBot.checkGuess(guess);

    const gameMessage = document.querySelector(".gameMessage") as HTMLElement;
    gameMessage.style.display = "none";

    inputWrapperElement.innerHTML = `
      <p style="font-size: 1.1rem; font-weight: bold; margin-top: 2rem">The bot guessed ${guess}.</p>
    `;

    setTimeout(showEndOfTurnMessage, 2000);

    playerBot.updateAlgorithm(sign, guess);

    if (!isGameOver) {
      setTimeout(playersTurn, 6000);
    }
  }
}

function playersTurn() {
  createPlayerInput();
  isPlayersTurn = true;
}

function botsTurn() {
  removePlayerInput();
  isPlayersTurn = false;
  setTimeout(takeTurn, 1000);
}

function createPlayerInput() {
  const inputWrapperElement = document.querySelector(
    ".player_input"
  ) as HTMLElement;

  if (inputWrapperElement) {
    inputWrapperElement.innerHTML = `
    <input required class="playerInput" type="number" placeholder="enter your guess" autofocus/>
    <button onclick="takeTurn();" class="button-round background-5 playGame">
      Submit
    </button>
  `;
  }

  inputFocus();
}

function removePlayerInput() {
  const inputWrapperElement = document.querySelector(
    ".player_input"
  ) as HTMLElement;
  inputWrapperElement.innerHTML = "";
}

function changeModeToBot() {
  multiplayerMode = true;
  const modeButtons = document.querySelectorAll(".modeButtons button") as any;
  modeButtons[1].style.outline = "solid";
  modeButtons[0].style.outline = "unset";
}

function changeModeToSingle() {
  multiplayerMode = false;
  const modeButtons = document.querySelectorAll(".modeButtons button") as any;
  modeButtons[0].style.outline = "solid";
  modeButtons[1].style.outline = "unset";
}

function createStartPage() {
  const oldPlayerName = localStorage.getItem("playerName");

  gamePage = GamePage.StartPage;
  const mainWrapper = clearMainWrapper();

  const markup = `
    <div class="title">DRUNK BOTS</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/easy_begin.png" alt="" 

        title = "Im Tipsy, I drank between 1 to 10 drinks, when it comes to multiplayer they are calling me easy bot."

        

        class="images" id="imgEasy" />
        <h3 class="difficulty">Tipsy</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/medium_begin.png" alt="" 

        title = "Im Hammered, I drank between 1 to 50 drinks, when it comes to multiplayer they are calling me medium bot."

        class="images" id="imgMedium" />
        <h3 class="difficulty">Hammered</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/hard_begin.png" alt="" 

        title = "Im Sloshed, I drank between 1 to 100 drinks, when it comes to multiplayer they are calling me hard bot."

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
  const playerName = document.getElementById("playerName") as HTMLInputElement;
  if (oldPlayerName !== null) {
    playerName.value = oldPlayerName;
  }
}

function createPlayPage() {
  gamePage = GamePage.PlayPage;
  guessBot = new GuessBot(maxNum);
  playerBot = new PlayerBot(maxNum);

  const mainWrapper = clearMainWrapper();
  const playerName = localStorage.getItem("playerName");

  const markup = `
    <div class="robotGreetings">"Greetings ${playerName}!"</div>
    <div class="botGuess"></div>
    <div class="gameMessage">${gameText.getGuessText(maxNum, true)}</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src=${getImageSource("begin.png")} alt="" class="images_game" />
      </div>
    </div>

    <div class="player_input">


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
    <h2>${isPlayersTurn ? "You " : "Bot "} WON!</h2><br>
    </div>
    <p>${isPlayersTurn ? "You " : "Bot "} guessed ${totalGuesses} times.</p>
    <img src=${getImageSource("win.gif")} alt="" class="images_game" />
    <div class="high_score">
      <div class="gameEndMessage"> "Only ${guess} ${gameText.correct}</div>
      <div class="user_and_score">
      <h2>HIGHEST SCORES</h2>
       <span><b>Name  -  Score</b></span>

      <ul class="ul_highscores">
      </div>
  
    </div>
  
    <button onclick="showPage(GamePage.StartPage);" id="player_input" class=" background-2">Restart</button>

  `;

  nGuesses = 0;
  botGuesses = 0;
  mainWrapper.innerHTML = markup;

  const highscoreDiv = document.querySelector(".user_and_score") as HTMLElement;
  const ulHighScores = document.querySelector(".ul_highscores") as HTMLElement;
  let listOfHighScores = JSON.parse(localStorage.getItem("highscore") || "");
  listOfHighScores.forEach(
    (element: { name: string; totalGuesses: string }) => {
      let node = document.createElement("LI");
      let textnode = document.createTextNode(
        element.name + " " + element.totalGuesses
      );
      node.appendChild(textnode);
      ulHighScores.appendChild(node);
    }
  );

  if (multiplayerMode === true) {
    highscoreDiv.style.display = "none";
  }
}

function inputFocus() {
  const playerInput = document.querySelector(
    ".playerInput"
  ) as HTMLInputElement;
  if (playerInput) {
    playerInput.focus();
  }
}

function clearMainWrapper(): HTMLElement {
  const mainWrapper = document.querySelector(".main_wrapper") as HTMLElement;
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
  const greetings = document.querySelector(".robotGreetings");
  greetings?.remove();
}

function botSelection() {
  let botSelected = document.querySelector(".bot_choice") as HTMLDivElement;
  let imageList = document.querySelectorAll(".images") as any;

  botSelected.onclick = function(e: any) {
    switch (e.toElement.id) {
      case "imgEasy":
        maxNum = Difficulty.Easy;
        imageList[0].style.background = "#f6d535";
        imageList[1].style.background = "unset";
        imageList[2].style.background = "unset";
        break;
      case "imgMedium":
        maxNum = Difficulty.Medium;
        imageList[0].style.background = "unset";
        imageList[1].style.background = "#f6d535";
        imageList[2].style.background = "unset";
        break;
      case "imgHard":
        maxNum = Difficulty.Hard;
        imageList[0].style.background = "unset";
        imageList[1].style.background = "unset";
        imageList[2].style.background = "#f6d535";
        break;
    }
  };
}

function getImageSource(imageName: string): string {
  let path = `./assets/images/easy_${imageName}`;
  if (guessBot.getMaxNum() === Difficulty.Medium) {
    path = `./assets/images/medium_${imageName}`;
  } else if (guessBot.getMaxNum() === Difficulty.Hard) {
    path = `./assets/images/hard_${imageName}`;
  }
  return path;
}
