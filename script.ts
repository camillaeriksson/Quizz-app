//some other stuff here
window.onload = init;
let playerInput: any

function init() {
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

  robotInstructions(gameText.welcome, false, ".robotInstructions");
  robotInstructions(gameText.guess, false, ".robotClues");
  const guessBot = new GuessBot(maxNum);
}

function getPlayerInput() {
  let playerInput
  let playerInputField = document.querySelector(".playerInput") as HTMLInputElement
  if (playerInputField !== null) {
    playerInput = playerInputField.value
  }
  return console.log(playerInput)
}

function welcomePlayer() {
  // let greetPlayer:string = "Greetings" + getPlayerInput()
  robotInstructions("hey", false, ".title_game")
  window.location.href = "./game.html"
  console.log("check")
}

function gameLoop(guessBot: GuessBot, gameText: any) {
  let nGuesses: number = 0;
  let gameOver: boolean = false;
  let input: string = "";

  while (true) {
    if (gameOver) {
      robotInstructions(gameText.playAgain, true, ".robotClues")
      const answer: any = getPlayerInput();
      if (answer === "y" || answer === "yes") {
        gameOver = false;
        guessBot.pickANumber();
        nGuesses = 0;
        continue;
      } else if (answer === "n" || answer === "no") break;
      continue;
    }

    if (!input) input = robotInstructions(gameText.guess, true, ".robotClues");

    const guess = input.length ? Number(input) : NaN;
    if (!isNaN(guess)) {
      nGuesses++;
      const sign = guessBot.checkGuess(guess);

      switch (sign) {
        case -1:
          input = robotInstructions(gameText.lower, true, ".robotClues");
          break;
        case 1:
          input = robotInstructions(gameText.higher, true, ".robotClues");
          break;
        default:
          let winText = gameText.correct + " " + nGuesses + " guesses.";
          robotInstructions(winText, false, ".robotClues")
          gameOver = true;
          input = "";
      }
    } else {
      input = robotInstructions(gameText.invalidGuess, false, ".robotClues");
    }
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
