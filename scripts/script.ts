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
let nGuesses: number = 1;
const guessBot: GuessBot = new GuessBot(maxNumEasy);
let gamePage: GamePage;
const range = {
  Easy: 10,
  Medium: 50,
  Hard: 100,

}


window.onclick = function (e: any) {
  console.log(e.toElement.id)
  switch (e.toElement.id) {
    case 'imgEasy':
      console.log(1)
      
      break;
    case 'imgMedium':
      console.log(2)
      break;
    case 'imgHard':
      console.log(3)
      break;
  }
}


const gameText = {
  welcome: `After a long night out the drunk robot and his friends are trying to get into one last bar. 
  The doorman asks the robot how many drinks he had, but even though his CPU works as hard as it can, 
  the robot can’t remember. Help him answer the doorman correctly!`,
  guess: `The robot had between 1 to ${maxNumEasy} drinks. What's your guess?`,
  higher: `- *hick**blip blop* No, that can’t be right... It must be <b>more</b>!`,
  lower: `-*beep beep boop* No, that can’t be right... It must be <b>less</b>!`,
  invalidGuess: `errr....**!!!..error.., enter a number between 1 and ${maxNumEasy}.`,
  correct: `drinks! That wasn’t many at all. Welcome inside to have some more!”, the doorman says.`
};


// function clickTipsy() {
// let tipsy = document.getElementById("imgEasy");
// tipsy.addEventListener("click");
// window.location.assign("./assets/images/easy.png");
//   } 

// function createRobotTipsy() {

// }

// function clickHammered() {
//   let hammered = document.getElementById("imgMedium");
//   hammered.addEventListener("click");
//   window.location.assign("./assets/images/medium.png");
//     } 

//   function createRobotHammered() {

//   }

//   function clickShitfaced() {
//     let shitfaced = document.getElementById("imgHard");
//     shitfaced.addEventListener("click"); 
//     window.location.assign("./assets/images/hard.png");
//       } 

//     function createRobotShitfaced() {

//     }

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
  removeGreetings()
  const gameTextSelector = document.querySelector(".gameMessage") as HTMLDivElement;
  const playerInputField = document.querySelector(".playerInput") as HTMLInputElement;
  const gameImage = document.querySelector(".images_game") as HTMLImageElement;

  gameTextSelector.classList.add('wobble');

  setTimeout(function () {
    gameTextSelector.classList.remove('wobble')
  }, 2000)

  if (playerInputField !== null) {
    guess = playerInputField.value || "invalid";
    localStorage.setItem("score", nGuesses.toString());

    if (!isNaN(guess)) {
      nGuesses++;
      const sign = guessBot.checkGuess(guess);

      switch (sign) {
        case -1:
          gameImage.src = "./assets/images/lower.png";
          gameTextSelector.innerHTML = gameText.lower;
          break;
        case 1:
          gameImage.src = "./assets/images/higher.png"
          gameTextSelector.innerHTML = gameText.higher;
          break;
        default:
          showPage(GamePage.EndPage);
      }
    } else if (isNaN(guess)) {
      gameImage.src = "./assets/images/invalid.png"
      gameTextSelector.innerHTML = gameText.invalidGuess;
    }
  }
  playerInputField.value = "enter your guess"
  console.log(guess);
}

function startGameSaveInput() {
  const playerName = document.getElementById("playerName") as HTMLInputElement;
  if (playerName !== null) {
    localStorage.setItem("playerName", playerName.value);
  }
  showPage(GamePage.PlayPage);
  inputFocus()
}

function createStartPage() {
  const oldPlayerName = localStorage.getItem('playerName');

  gamePage = GamePage.StartPage;
  const mainWrapper = clearMainWrapper();

  const markup = `
    <div class="title">DRUNK BOTS</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/easy.png" alt="" class="images" id="imgEasy" />
        <h3 class="difficulty">Tipsy</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/medium.png" alt="" class="images" id="imgMedium" />
        <h3 class="difficulty">Hammered</h3>
      </div>
      <div class="robotImages">
        <img src="./assets/images/hard.png" alt="" class="images" id="imgHard"/>
        <h3 class="difficulty">Sloshed</h3>
      </div>
    </div>

    <div class="rules">
      <div class="robotInstructions">${gameText.welcome}</div>
    </div>

    <div class="player_input">
      <input id="playerName" type="text" placeholder="enter your name" autofocus/>

      <button onclick="startGameSaveInput(); inputFocus(); " id="player_input" class="background-2">start</button>

    </div>
  `;

  mainWrapper.innerHTML = markup;

  const playerName = document.getElementById("playerName") as HTMLInputElement;
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
    <div class="gameMessage">${gameText.guess}</div>

    <div class="bot_choice">
      <div class="robotImages">
        <img src="./assets/images/easy.png" alt="" class="images_game" />
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
    <img src="./assets/images/win.gif" alt="" class="images_game" />
    <div class="high_score">
      <div class="gameEndMessage"> "Only ${guess} ${gameText.correct}</div>
      <h2>HIGHEST SCORES</h2>
      <div class="user_and_score">
      <ul class="ul_highscores">
      </div>
  
    </div>
  
    <button onclick="showPage(GamePage.StartPage);" id="player_input" class=" background-2">Restart</button>

  `;

  nGuesses = 1;
  mainWrapper.innerHTML = markup;

  const ulHighScores = document.querySelector('.ul_highscores') as HTMLElement;
  let listOfHighScores = JSON.parse(localStorage.getItem("highscore") || "")
  listOfHighScores.forEach((element: any) => {         // CHANGE TYPE
    var node = document.createElement("LI");
    var textnode = document.createTextNode(element.name + " " + element.totalGuesses);
    node.appendChild(textnode);
    ulHighScores.appendChild(node);
  });
}

function inputFocus() {
  const playerInput = document.querySelector('.playerInput') as HTMLInputElement;
  if (playerInput) { playerInput.focus(); }
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
  const greetings = document.querySelector('.robotGreetings')
  greetings?.remove()
}


