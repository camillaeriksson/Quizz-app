class PlayerBot {
  private maxNumber: number;
  private history: number[] = [];

  constructor(maxNumber: number) {
    this.maxNumber = maxNumber;
  }

  guesses = [
    {
      value: 50,
      sign: 1
    },
    {
      value: 75,
      sign: -1
    },
    {
      value: 62,
      sign: 1
    }
  ];

  makeAGuess = (): number => {
    let guess: number;

    if (this.history.length == 0) {
      guess = Math.floor(Math.random() * this.maxNumber);
      this.history.push(guess);
      return guess;
    }

    const [min, max] = this.findMinMax();
    guess = Math.floor((min + max) / 2);

    return guess;
  };

  findMinMax() {
    let min: number = 0;
    let max: number = 0;

    for (let i = 0; i < this.guesses.length; i++) {
      if (i === 0) min = this.guesses[i].value;
      if (i === 0) max = this.guesses[i].value;
      if (min > this.guesses[i].value) min = this.guesses[i].value;
      if (max < this.guesses[i].value) max = this.guesses[i].value;
    }

    return [min, max];
  }
}
