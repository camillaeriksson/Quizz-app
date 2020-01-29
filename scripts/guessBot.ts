class GuessBot {
  private maxNumber: number;
  private secretNumber: number;

  constructor(maxNumber: number) {
    this.maxNumber = maxNumber;
    this.secretNumber = this.pickANumber();
  }

  pickANumber = (): number => {
    this.secretNumber = Math.floor((Math.random()) * this.maxNumber);
    console.log(this.secretNumber)
    return this.secretNumber;
  };

  setMaxNum = (range: number): void => {
    this.maxNumber = range;
  }

  getMaxNum = (): number => {return this.maxNumber}

  checkGuess = (guess: number): number =>
    guess < this.secretNumber ? 1 : guess > this.secretNumber ? -1 : 0;

}