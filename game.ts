

import { Board } from "./board";
import { Amazon, Rook, King, Piece } from "./piece";
import { Color } from "./types";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startGame() {
    const board = new Board();

const whiteRook = new Rook(Color.White, {row: 0, col: 0});
const blackAmazon = new Amazon(Color.Black, { row: 7, col: 7} );
const whiteKing = new King(Color.White, { row: 0, col: 4});
const blackKing = new King(Color.Black, { row: 7, col: 4});

board.placePiece(whiteRook);
board.placePiece(blackAmazon);
board.placePiece(whiteKing);
board.placePiece(blackKing);

/*const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });*/
  
  let currentPlayer = Color.White;
  
console.log("🎮 Game Start!");
board.printBoard();
  
  function promptMove() {
    rl.question(`\n${currentPlayer}'s turn. Enter your move (fromRow fromCol toRow toCol): `, input => {
      const [fromRow, fromCol, toRow, toCol] = input.trim().split(" ").map(Number);
  
      const from = { row: fromRow, col: fromCol };
      const to = { row: toRow, col: toCol };
  
      const moved = board.movePiece(from, to);
      if (!moved) {
        console.log("❌ Invalid move. Try again.");
        return promptMove();
      }
  
      const movedPiece = board.grid[to.row][to.col];
      if (movedPiece && checkWinCondition(movedPiece)) {
        board.printBoard();
        console.log(`\n🏁 ${currentPlayer} wins by King Escape!`);
        askRestart();
        return;
      }
  
      board.printBoard();
      currentPlayer = currentPlayer === Color.White ? Color.Black : Color.White;
      promptMove();
    });
  }
  promptMove();
  
}
  
  function checkWinCondition(piece: Piece): boolean{
    if (!(piece instanceof King)) return false;
    if (piece.color === Color.White && piece.position.row === 7) return true;
    if (piece.color === Color.Black && piece.position.row === 0) return true;
    return false;
}

function askRestart() {
    rl.question("\n🔁 Play again? (y/n): ", answer => {
        if (answer.trim().toLowerCase() === "y"){
            console.clear();
            startGame();
        } else {
            console.log("👋 Thanks for playing!");
            rl.close();
        }
    });
}

/*console.log("Initial Board;");
board.printBoard();
*/

/*console.log("\nMoving the rook...");
board.movePiece({ row: 0, col: 0 }, {row: 0, col: 5 });
*/

/*console.log("\nUpdated Board:");
board.printBoard();
*/

//console.log("White wins by King Escape!")

/*const steps = [
    { from: { row: 0, col: 4 }, to: { row: 1, col: 4 } },
    { from: { row: 1, col: 4 }, to: { row: 2, col: 4 } },
    { from: { row: 2, col: 4 }, to: { row: 3, col: 4 } },
    { from: { row: 3, col: 4 }, to: { row: 4, col: 4 } },
    { from: { row: 4, col: 4 }, to: { row: 5, col: 4 } },
    { from: { row: 5, col: 4 }, to: { row: 6, col: 4 } },
    { from: { row: 6, col: 4 }, to: { row: 7, col: 4 } }, // ESCAPE!
  ];
  
for (const step of steps) {
    const moves = board.movePiece(step.from, step.to);
    console.log(`\nMoved to (${step.to.row}, ${step.to.col})`);
    board.printBoard();

    if (moves && checkWinCondition(whiteKing, board)) {
        console.log("\n🏁 White wins by King Escape!");
        break;
    }
}
*/






/*const moved = board.movePiece({ row: 0, col: 4 }, { row: 1, col: 4});
if (moved && checkWinCondition(whiteKing, board)){
    console.log("White wins by King Escape!")
}*/

startGame();