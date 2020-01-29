class GuessBot {
  private maxNumber: number;
  private secretNumber: number;

  constructor(maxNumber: number) {
    this.maxNumber = maxNumber;
    this.secretNumber = this.pickANumber();
  }

  pickANumber = (): number => {
    this.secretNumber = Math.floor(Math.random() * this.maxNumber) + 1;
    console.log("secret number ", this.secretNumber)
    console.log("maxNumber: ", this.maxNumber;)
    return this.secretNumber;
  };

  setMaxNum = (range: number): void => {
    this.maxNumber = range;
  }

  getMaxNum = (): number => {return this.maxNumber}

  checkGuess = (guess: number): number => {
    if (guess < this.secretNumber) {
      return 1;
    } else if (guess > this.secretNumber) {
      return -1;
    } else {
      return 0;
    }
  }
    // guess < this.secretNumber ? 1 : guess > this.secretNumber ? -1 : 0;

}