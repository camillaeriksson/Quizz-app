//some other stuff here
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

window.onload = init;
let guess: any
let gamePlaying = false
const maxNum = 100;
let nGuesses: number = 0;
const guessBot = new GuessBot(maxNum);
let playerName = "ghost"


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
}

function getPlayerInput() {
  let playerInputField = document.querySelector(".playerInput") as HTMLInputElement
  if (playerInputField !== null) {
    guess = Number(playerInputField.value)

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
          let winText = gameText.correct + " " + nGuesses + " guesses.";
          robotInstructions(winText, false, ".robotEndMessage")
          window.location.href = "./end_page.html"
      }
    }
  }

  console.log(guess)
}

function welcomePlayer() {
  let playerNameField = document.querySelector(".playerName") as HTMLInputElement
  if (playerNameField !== null) {
    playerName = playerNameField.value
  }
  console.log(playerName)
  window.location.href = "./game.html"
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
