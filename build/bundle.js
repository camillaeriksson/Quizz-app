// "use strict";
// window.onload = init;
// function init() {
//     const maxNum = 100;
//     const gameText = {
//         welcome: `Welcome to the fantastic Guess The Number game. The objective is to guess what number the guess robot is thinking of.`,
//         guess: `The guess robot is thinking of a number between 0 and ${maxNum}. What's your guess?`,
//         higher: `The robot is thinking of a higher number than your guess. Guess again.`,
//         lower: `The robit is thinking of a lower number than your guess. Guess again`,
//         invalidGuess: `Your guess is invalid, enter a number between 0 and ${maxNum}.`,
//         correct: `Victory!!! You outsmarted the guess robot and guessed the correct number in `,
//         playAgain: `Play again? Y/N?`
//     };
//     const guessBot = new GuessBot(maxNum);
//     gameLoop(guessBot, gameText);
// }
// function gameLoop(guessBot, gameText) {
//     let nGuesses = 0;
//     let gameOver = false;
//     let input = "";
//     alert(gameText.welcome);
//     while (true) {
//         if (gameOver) {
//             const answer = promptUser(gameText.playAgain);
//             if (answer === "y" || answer === "yes") {
//                 gameOver = false;
//                 guessBot.pickANumber();
//                 nGuesses = 0;
//                 continue;
//             }
//             else if (answer === "n" || answer === "no")
//                 break;
//             continue;
//         }
//         if (!input)
//             input = promptUser(gameText.guess);
//         const guess = input.length ? Number(input) : NaN;
//         if (!isNaN(guess)) {
//             nGuesses++;
//             const sign = guessBot.checkGuess(guess);
//             switch (sign) {
//                 case -1:
//                     input = promptUser(gameText.lower);
//                     break;
//                 case 1:
//                     input = promptUser(gameText.higher);
//                     break;
//                 default:
//                     alert(gameText.correct + " " + nGuesses + " guesses.");
//                     gameOver = true;
//                     input = "";
//             }
//         }
//         else {
//             input = promptUser(gameText.invalidGuess);
//         }
//     }
// }
// function promptUser(gameText) {
//     const rawInput = prompt(gameText) || "";
//     const transformedInput = rawInput.toLowerCase().trim();
//     return transformedInput;
// }
// class GuessBot {
//     constructor(maxNumber) {
//         this.pickANumber = () => {
//             this.secretNumber = Math.floor(Math.random() * this.maxNumber);
//             return this.secretNumber;
//         };
//         this.checkGuess = (guess) => guess < this.secretNumber ? 1 : guess > this.secretNumber ? -1 : 0;
//         this.maxNumber = maxNumber;
//         this.secretNumber = this.pickANumber();
//     }
// }
// //# sourceMappingURL=bundle.js.map