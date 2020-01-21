enum GamePage {
  StartPage,
  PlayPage,
  EndPage
}

window.onload = init;
let guess: any;
const maxNumEasy: number = 10;
const maxNumMedium: number = 50;
const maxNumHard: number = 100;
let nGuesses: number = 0;
const guessBot: GuessBot = new GuessBot(maxNumEasy);
let gamePage: GamePage;

const gameText = {
  welcome: `After a long night out the drunk robot and his friends are trying to get into one last bar. 
  The doorman asks the robot how many drinks he had, but even though his CPU works as hard as it can, 
  the robot can’t remember. Help him answer the doorman correctly!`,
  guess: `The robot had between 1 to ${maxNumEasy} drinks. What's your guess?`,
  higher: `- *hick**blip blop* No, that can’t be right... It must be more!`,
  lower: `-*beep beep boop* No, that can’t be right... It must be less!`,
  invalidGuess: `Your guess is invalid, enter a number between 1 and ${maxNumEasy}.`,
  correct: `guesses! That wasn’t many at all. Welcome inside to have some more!”, the doorman says.`
};


function clickTipsy() {
let tipsy = document.getElementById("imgEasy");
tipsy.addEventListener("click");
window.location.assign("./assets/images/easy.png");
  } 

function createRobotTipsy() {

}

function clickHammered() {
  let hammered = document.getElementById("imgMedium");
  hammered.addEventListener("click");
  window.location.assign("./assets/images/medium.png");
    } 
  
  function createRobotHammered() {
  
  }

  function clickShitfaced() {
    let shitfaced = document.getElementById("imgHard");
    shitfaced.addEventListener("click"); 
    window.location.assign("./assets/images/hard.png");
      } 
    
    function createRobotShitfaced() {
    
    }

function init() {
  showPage(GamePage.StartPage);
  document.addEventListener("keydown", e => handleKeypress(e))
}

function handleKeypress(e: KeyboardEvent) {
  if (e.keyCode === 13) {
    switch(gamePage) {
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

function getPlayerInput() {
  const gameTextSelector = document.querySelector(".gameMessage") as HTMLDivElement;
  let playerInputField = document.querySelector(
    ".playerInput"
  ) as HTMLInputElement;
  if (playerInputField !== null) {
    guess = Number(playerInputField.value);

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
    } else if (isNaN(guess)) {
      gameTextSelector.innerHTML = gameText.invalidGuess;
    }
  }
  playerInputField.value = ""
  console.log(guess);
}

function startGameSaveInput() {
  let playerName = document.getElementById("playerName") as HTMLInputElement;
  if (playerName !== null) {
    localStorage.setItem("playerName", playerName.value);
 }
  showPage(GamePage.PlayPage);
}

function createStartPage() {
  gamePage = GamePage.StartPage;
  const mainWrapper = clearMainWrapper();

  const markup = `
    <div class="title">GAME'S NAME</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/easy.png" alt="" id="imgEasy" />
        <h3 class="difficulty">Tipsy</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/medium.png" alt="" id="imgMedium" />
        <h3 class="difficulty">Hammered</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/hard.png" alt="" id="imgHard" />
        <h3 class="difficulty">Shitfaced</h3>
      </div>
    </div>

    <div class="rules">
      <h2>HOW TO PLAY</h2>
      <div class="robotInstructions">${gameText.welcome}</div>
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
  gamePage = GamePage.PlayPage;
  const mainWrapper = clearMainWrapper();

  const playerName = localStorage.getItem("playerName");

  const markup = `
    <div class="title_game"></div>

    <div class="robotGreetings">"Greetings ${playerName}!"</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/easy.png" alt="" class="images_game" />
      </div>
    </div>

    <div class="player_input">
      <div class="gameMessage">${gameText.guess}</div>
      <input class="playerInput" type="text" placeholder="enter your guess" />
      <button class="playGame" onclick="getPlayerInput()">
        <h2>PLAY</h2>
      </button>
    </div>
  `;

  mainWrapper.innerHTML = markup;
}

function createEndPage() {
  gamePage = GamePage.EndPage;
  const mainWrapper = clearMainWrapper();

  const markup = `
    <div class="title_ender">
      <H1>YOU WON!</H1>
    </div>
    
    <div class="bot_choice"></div>

    <div class="high_score">
      <h2>HIGHEST SCORES</h2>
      <div class="gameEndMessage"> "Only ${nGuesses} ${gameText.correct}</div>
    </div>
  
    <button class="startAgain" onclick="showPage(GamePage.StartPage)">PLAY AGAIN</button>
  `;

  mainWrapper.innerHTML = markup;
}

function clearMainWrapper(): HTMLElement {
  const mainWrapper = document.querySelector(".main_wrapper") as HTMLElement;
  mainWrapper.innerHTML = "";
  return mainWrapper;
}



