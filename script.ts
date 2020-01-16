//some other stuff here
window.onload = init;
let playerInput: any
let gamePlaying = false
const maxNum = 100;

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
  const guessBot = new GuessBot(maxNum);
  gameLoop(guessBot, gameText)
  robotInstructions(gameText.welcome, false, ".robotInstructions");
  robotInstructions(gameText.guess, false, ".robotClues");
}

function getPlayerInput() {
  let playerInputField = document.querySelector(".playerInput") as HTMLInputElement
  if (playerInputField !== null) {
    playerInput = playerInputField.value
  }
  return console.log(playerInput)
}

function welcomePlayer() {
  // let playerName = getPlayerInput() || " "
  // localStorage.setItem("playerName", playerName)
 
  runGamePage()
}

function runGamePage(){
  let player = localStorage.getItem("playerName")
  const textSelector = document.querySelector(".myName")
  if (textSelector !== null) {
    textSelector.innerHTML = player || "Player"
  }
  window.location.href = "./game.html"
}

function gameLoop(guessBot: GuessBot, gameText: any) {
  let nGuesses: number = 0;
  let gameOver: boolean = false;
  let robotClues: string = "";
  const answer: any = getPlayerInput();

  if (gameOver) {
    robotInstructions(gameText.playAgain, true, ".robotClues")
    if (answer === "y" || answer === "yes") {
      gameOver = false;
      guessBot.pickANumber();
      nGuesses = 0;
    } 
    else {
      window.location.href = "./end_page.html"
    }
  }

  if (!robotClues) {robotClues = robotInstructions(gameText.guess, true, ".robotClues")};

  const guess = answer;
  if (!isNaN(guess)) {
    nGuesses++;
    const sign = guessBot.checkGuess(guess);

    switch (sign) {
      case -1:
        robotClues = robotInstructions(gameText.lower, true, ".robotClues");
        break;
      case 1:
        robotClues = robotInstructions(gameText.higher, true, ".robotClues");
        break;
      default:
        let winText = gameText.correct + " " + nGuesses + " guesses.";
        robotInstructions(winText, false, ".robotClues")
        gameOver = true;
        robotClues = "";
    }
  } else {
    robotClues = robotInstructions(gameText.invalidGuess, false, ".robotClues");
  }
}


function robotInstructions(gameText: string, trim: boolean, nameOfClass: string) {
  const gameTextSelector = document.querySelector(nameOfClass)
  if (gameTextSelector !== null) {
    if (trim) {
      gameTextSelector.innerHTML = gameText.toLowerCase().trim();
    }
    else {
      gameTextSelector.innerHTML = gameText
    }
  }
  return gameText
}


class GuessBot {
  private maxNumber: number;
  private secretNumber: number;

  constructor(maxNumber: number) {
    this.maxNumber = maxNumber;
    this.secretNumber = this.pickANumber();
  }

  pickANumber = (): number => {
    this.secretNumber = Math.floor(Math.random() * this.maxNumber);
    return this.secretNumber;
  };

  checkGuess = (guess: number): number =>
    guess < this.secretNumber ? 1 : guess > this.secretNumber ? -1 : 0;
}
