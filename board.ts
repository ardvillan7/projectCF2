

import { Piece } from "./piece";
import { Position } from "./types";

export class Board {
    grid: (Piece | null) [][];

    constructor(public size: number = 8) {
        this.grid = Array.from({ length: size }, () => Array(size).fill(null));

    }

    placePiece(piece: Piece) {
        const { row, col } = piece.position;
        if (this.inBounds({ row, col })) {
            this.grid[row][col] = piece;
        }
    }

    movePiece(from: Position, to: Position) {
        if (!this.inBounds(from) || !this.inBounds(to)) return false;

        const piece = this.grid[from.row][from.col];
        if (!piece) return false;

       this.grid[to.row][to.col] = piece;
       piece.position = to;
       this.grid[from.row][from.col] = null;
       return true; 
    }

    inBounds(pos: Position): boolean{
        return pos.row >= 0 && pos.row < this.size && pos.col >= 0 && pos.col < this.size;
    }

    printBoard() {
        for (const row of this.grid) {
            console.log(row.map(cell => (cell ? cell.constructor.name[0] : ".")).join(" "));
            
        }
    }
}