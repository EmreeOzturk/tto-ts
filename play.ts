import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

type CurrnetPlayer = "[X]" | "[Y]";

let currentPlayer: CurrnetPlayer = "[X]";
const gameBoard = Array.from({ length: 3 }, () => new Array(3).fill("[ ]"));

const checkWin = () => {
  for (let i = 0; i < 3; i++) {
    if (
      (gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i] &&
        gameBoard[1][i] !== "[ ]") ||
      (gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][1] === gameBoard[i][2] &&
        gameBoard[i][0] !== "[ ]")
    ) {
      return true;
    }
  }
  if (
    (gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2] &&
      gameBoard[0][0] !== "[ ]") ||
    (gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][0] &&
      gameBoard[0][2] !== "[ ]")
  ) {
    return true;
  }

  return false;
};

const displayBoard = () => {
  //   for (let i = 0; i < 3; i++) {
  //     console.log(gameBoard[i]);
  //   }
  gameBoard.forEach((row) => {
    console.log(row[0] + " | " + row[1] + " | " + row[2]);
  });
};

const makeMove = (row: number, col: number) => {
  if (0 <= row && row <= 2 && 0 <= col && col <= 2) {
    if (gameBoard[row][col] !== "[ ]") {
      console.log("target area is already full");
    } else {
      gameBoard[row][col] = currentPlayer;
    }
  } else {
    console.log("invalid row or col");
  }
};

const changeTurn = () => {
  currentPlayer === "[X]" ? (currentPlayer = "[Y]") : (currentPlayer = "[X]");
};

const gameLoop = () => {
  rl.question("Select row (between 0-2)", (row) => {
    rl.question("Select col (between 0-2)", (col) => {
      makeMove(parseInt(row), parseInt(col));
      displayBoard();
      if (checkWin()) {
        console.log(currentPlayer.slice(1, 2) + " win this game");
        process.exit();
      } else {
        changeTurn();
        console.log("Turn :" + currentPlayer.slice(1, 2));
        gameLoop();
      }
    });
  });
};

console.log(currentPlayer.slice(1, 2) + " is now starting game.");
gameLoop();
