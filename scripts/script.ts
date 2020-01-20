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
}

function showPage(gamePage: GamePage) {
  switch(gamePage) {
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
      <div class="robotInstructions">${gameText.welcome}</div>
    </div>

    <div class="player_input">
      <input id="playerName" type="text" placeholder="enter your name" />
      <button onclick="startGameSaveInput()" id="player_input">
        START
      </button>
    </div>
  `;
  document.onkeydown = function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      startGameSaveInput();   
    } }

  mainWrapper.innerHTML = markup;
}

function createPlayPage() {
  const mainWrapper = clearMainWrapper();

  const playerName = localStorage.getItem("playerName");

  const markup = `
    <div class="title_game"></div>

    <div class="robotGreetings">"Greetings ${playerName}!"</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/hard.png" alt="" class="images_game" />
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
  document.onkeydown = function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      getPlayerInput();      
    } }
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
      <div class="gameEndMessage"> "Only ${nGuesses} ${gameText.correct}</div>
    </div>
  
    <button class="startAgain" onclick="showPage(GamePage.StartPage)">PLAY AGAIN</button>
  `;
  document.onkeydown = function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      showPage(GamePage.StartPage);      
    } }
  mainWrapper.innerHTML = markup;
}

function clearMainWrapper(): HTMLElement {
  const mainWrapper = document.querySelector(".main_wrapper") as HTMLElement;
  mainWrapper.innerHTML = "";
  return mainWrapper;
}

