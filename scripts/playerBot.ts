class PlayerBot {
  private lastGuess: number = -1;
  private low: number;
  private high: number;

  constructor(maxNumber: number) {
    this.low = 1;
    this.high = maxNumber;
  }

  smartGuess = (sign: -1 | 0 | 1, lastGuess?: number): number => {
    let guess: number;

    // 0 if it's the first guess of the round
    if (sign === 0) {
      guess = Math.floor((this.high - this.low) / 2);
      this.lastGuess = guess;
      return guess;
    }

    lastGuess ? this.lastGuess = lastGuess : null;

    if (sign === 1) {
      this.low = this.lastGuess;
      const x = Math.floor((this.high - this.low) / 2);
      guess = this.lastGuess + x;
      this.lastGuess = guess;
      return guess;
    } else {
      this.high = this.lastGuess;
      const x = Math.floor((this.high - this.low) / 2);
      guess = this.lastGuess - x;
      this.lastGuess = guess;
      return guess;
    }
  };

  stupidGuess = (sign: -1 | 0 | 1, lastGuess?: number): number => {
    let guess: number;

    if (sign === 0) {
      guess = Math.floor(Math.random() * this.high) + 1;
      this.lastGuess = guess;
      return guess;
    }

    lastGuess ? this.lastGuess = lastGuess : null;

    if (sign === 1) {
      guess =
        this.lastGuess +
        Math.floor(Math.random() * (this.high - this.lastGuess) + 1);
      this.lastGuess = guess;
      return guess > this.high ? this.high : guess;
    } else {
      guess =
        this.lastGuess -
        Math.floor(Math.random() * (this.high - this.lastGuess) + 1);
      this.lastGuess = guess;
      return guess < this.low ? this.low : guess;
    }
  };

  retardedGuess = (): (number | string) => {
    let guess: number | string;

    const chance = Math.random();

    if (chance > 0.6) {
      guess = "bip bop";
      return guess;
    }

    guess = Math.floor(Math.random() * this.high) + 1;

    return guess;
  }
}
