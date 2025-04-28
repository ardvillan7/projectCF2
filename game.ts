

import { Board } from "./board";
import { Amazon, Rook } from "./piece";
import { Color } from "./types";

const board = new Board();

const rook = new Rook(Color.White, {row: 0, col: 0});
const amazon = new Amazon(Color.Black, { row: 7, col: 7} );

board.placePiece(rook);
board.placePiece(amazon);

console.log("Initial Board;");
board.printBoard();

console.log("\nMoving the rook...");
board.movePiece({ row: 0, col: 0 }, {row: 0, col: 5 });

console.log("\nUpdated Board:");
board.printBoard();