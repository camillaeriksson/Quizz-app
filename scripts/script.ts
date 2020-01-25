enum GamePage {
  StartPage,
  PlayPage,
  EndPage
}

window.onload = init;
let guess: any;
const maxNum: number = 100;
let nGuesses: number = 0;
const guessBot: GuessBot = new GuessBot(maxNum);
let gamePage: GamePage;

const gameText = {
  welcome: `After a long night out the drunk robot and his friends are trying to get into one last bar. 
  The doorman asks the robot how many drinks he had, but even though his CPU works as hard as it can, 
  the robot can’t remember. Help him answer the doorman correctly!`,
  guess: `The robot had between 1 to ${maxNum} drinks. What's your guess?`,
  higher: `- *hick**blip blop* No, that can’t be right... It must be <b>more</b>!`,
  lower: `-*beep beep boop* No, that can’t be right... It must be <b>less</b>!`,
  invalidGuess: `errr....**!!!..error.., enter a number between 1 and ${maxNum}.`,
  correct: `guesses! That wasn’t many at all. Welcome inside to have some more!”, the doorman says.`
};

function init() {
  showPage(GamePage.StartPage);
  document.addEventListener("keydown", e => handleKeypress(e))
}

function handleKeypress(e: KeyboardEvent) {
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

  inputFocus()
  const gameTextSelector = document.querySelector(".gameMessage") as HTMLDivElement;
  const playerInputField = document.querySelector(".playerInput") as HTMLInputElement;
  const gameImage = document.querySelector(".images_game") as HTMLImageElement;

  gameTextSelector.classList.add('wobble');

  setTimeout(function () {
    gameTextSelector.classList.remove('wobble')
  }, 5000)

  if (playerInputField !== null) {
    guess = Number(playerInputField.value);

    if (!isNaN(guess)) {
      nGuesses++;
      const sign = guessBot.checkGuess(guess);

      switch (sign) {
        case -1:
          gameTextSelector.innerHTML = gameText.lower;
          gameImage.src = "./assets/images/lower.png";

          break;
        case 1:
          gameTextSelector.innerHTML = gameText.higher;
          gameImage.src = "./assets/images/higher.png"
          break;
        default:
          showPage(GamePage.EndPage);
      }
    } else if (isNaN(guess)) {
      gameTextSelector.innerHTML = gameText.invalidGuess;
      gameImage.src = "./assets/images/invalid.png"
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
  inputFocus()
}

function createStartPage() {
  gamePage = GamePage.StartPage;
  const mainWrapper = clearMainWrapper();

  const markup = `
    <div class="title">DRUNK BOTS</div>

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
        <h3 class="difficulty">Sloshed</h3>
      </div>
    </div>

    <div class="rules">
      <div class="robotInstructions">${gameText.welcome}</div>
    </div>

    <div class="player_input">
      <input id="playerName" type="text" placeholder="enter your name" autofocus/>
      <button onclick="startGameSaveInput();" id="player_input">
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
    <div class="robotGreetings">"Greetings ${playerName}!"</div>
    <div class="gameMessage">${gameText.guess}</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/hard.png" alt="" class="images_game" />
      </div>
    </div>

    <div class="player_input">
      <input class="playerInput" type="text" placeholder="enter your guess" autofocus/>
      <button class="playGame" onclick="getPlayerInput();">
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
    <h2>YOU WON!</h2>
    </div>
    
    <div class="high_score">
    <h2>HIGHEST SCORES</h2>
    <img src="./assets/images/win.gif" alt="" class="images_game" />
    <div class="gameEndMessage"> "Only ${nGuesses} ${gameText.correct}</div>
    <button class="startAgain" onclick="showPage(GamePage.StartPage)">PLAY AGAIN</button>
    </div>
  
  `;

  mainWrapper.innerHTML = markup;
}

function inputFocus() {
  const playerInput = document.querySelector('.playerInput') as HTMLInputElement;
  if(playerInput)
  {playerInput.focus();}
}

function clearMainWrapper(): HTMLElement {
  const mainWrapper = document.querySelector(".main_wrapper") as HTMLElement;
  mainWrapper.innerHTML = "";
  return mainWrapper;
}




