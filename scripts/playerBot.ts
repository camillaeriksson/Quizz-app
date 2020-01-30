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
  private difficulty: Difficulty;
  private low: number;
  private high: number;
  private lastGuess: number = -1;

  constructor(difficulty: Difficulty) {
    this.maxNumber = difficulty;
    this.difficulty = difficulty;
    this.low = 1;
    this.high = this.maxNumber;
  }

  guess(sign?: Sign, lastGuess?: number): number {
    switch(this.difficulty) {
      case Difficulty.Easy:
        return this.retardedGuess();
      case Difficulty.Medium:
        return this.stupidGuess(sign, lastGuess);
      case Difficulty.Hard:
        return this.smartGuess(sign, lastGuess);
      default:
        return this.retardedGuess();
    }
  }

  smartGuess = (sign?: Sign, lastGuess?: number): number => {
    let guess: number;

    // if (this.lastGuess === -1) {
    //   this.low = 1;
    //   this.high = this.maxNumber;
    //   guess = Math.floor((this.high - this.low) / 2) + 1;
    //   this.lastGuess = guess;
    //   console.log("h: ", this.lastGuess);
      
    //   return guess;
    // }

    lastGuess ? (this.lastGuess = lastGuess) : null;

    if (sign === Sign.Higher) {
      this.low = this.low > this.lastGuess ? this.low : this.lastGuess ;
      const diff = this.high - this.low;
      const x = Math.floor(diff / 2);
      guess = this.low + (diff <= 1 ? diff : x);
      this.lastGuess = guess;


      console.log({low: this.low, high: this.high, lastGuess: this.lastGuess})
      
      return guess;
    } else {
      this.high = this.high < this.lastGuess ? this.high : this.lastGuess;
      const diff = this.high - this.low;
      const x = Math.floor((this.high - this.low) / 2);
      guess = this.low + diff - x;
      this.lastGuess = guess;
      
      console.log({low: this.low, high: this.high, lastGuess: this.lastGuess})
      return guess;
    }
  };
  
  stupidGuess = (sign?: Sign, lastGuess?: number): number => {
    let guess: number;
    
    if (lastGuess === -1) {
      this.low = 1;
      this.high = this.maxNumber;
      guess = Math.floor(Math.random() * this.high) + 1;
      this.lastGuess = guess;
      return guess;
    }

    lastGuess ? (this.lastGuess = lastGuess) : null;

    if (sign === Sign.Higher) {
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

  retardedGuess = (): number => {
    let guess: number;
    const chance = Math.random();

    if (chance > 1) {
      guess = -1;
      return guess;
    }

    guess = Math.floor(Math.random() * this.maxNumber) + 1;
    console.log("kl");
    
    return guess;
  };

  // improveAlgorithm = (sign: Sign, guess: number) => {
    
  // }
}
