/**
 * The player bot has three guessing algorithms
 * If the player bot is the first to guess in a round
 * the sign parameter should be 0.
 * If it's not the first guess of the round, the sign parameter
 * should be 1 if the guess should be higher and -1 if
 * the guess should be lower.
 * To make the algorithms better also supply the lastGuess
 * parameter which should be the number the previous player
 * guessed.
 */

class PlayerBot {
  private maxNumber: number;
  private low: number;
  private high: number;
  private lastGuess: number = -1;

  constructor(maxNumber: number) {
    this.maxNumber = maxNumber;
    this.low = 1;
    this.high = maxNumber;
  }

  smartGuess = (sign: -1 | 1, lastGuess?: number): number => {
    let guess: number;

    if (lastGuess === -1) {
      this.low = 1;
      this.high = this.maxNumber;
      guess = Math.floor((this.high - this.low) / 2) + 1;
      this.lastGuess = guess;
      return guess;
    }

    lastGuess ? (this.lastGuess = lastGuess) : null;

    if (sign === 1) {
      this.low = this.lastGuess;
      const diff = this.high - this.lastGuess;
      const x = Math.floor(diff / 2);
      guess = this.lastGuess + (diff <= 1 ? diff : x);
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

  stupidGuess = (sign: -1 | 1, lastGuess?: number): number => {
    let guess: number;

    if (lastGuess === -1) {
      this.low = 1;
      this.high = this.maxNumber;
      guess = Math.floor(Math.random() * this.high) + 1;
      this.lastGuess = guess;
      return guess;
    }

    lastGuess ? (this.lastGuess = lastGuess) : null;

    if (sign === 1) {
      this.low = this.lastGuess;
      guess =
        this.lastGuess +
        Math.floor(Math.random() * (this.high - this.lastGuess) + 1);
      this.lastGuess = guess;
      return guess > this.high ? this.high : guess;
    } else {
      this.high = this.lastGuess;
      guess =
        this.lastGuess -
        Math.floor(Math.random() * (this.high - this.low) + 1);
      this.lastGuess = guess;
      return guess < this.low ? this.low : guess;
    }
  };

  retardedGuess = (): number | string => {
    let guess: number | string;
    const chance = Math.random();

    if (chance > 0.6) {
      guess = "bip bop";
      return guess;
    }

    guess = Math.floor(Math.random() * this.maxNumber) + 1;

    return guess;
  };
}
