class GuessBot {
  private maxNumber: number;
  private secretNumber: number;

  constructor(maxNumber: number) {
    this.maxNumber = maxNumber;
    this.secretNumber = this.pickANumber();
  }

  pickANumber = (): number => {
    this.secretNumber = Math.floor(Math.random() * this.maxNumber) + 1;
    return this.secretNumber;
  };

  setMaxNum = (range: number): void => {
    this.maxNumber = range;
  };

  getMaxNum = (): number => {
    return this.maxNumber;
  };

  checkGuess = (guess: number): Sign => {
    if (guess < this.secretNumber) {
      return Sign.Higher;
    } else if (guess > this.secretNumber) {
      return Sign.Lower;
    } else {
      return Sign.Correct;
    }
  };
}
