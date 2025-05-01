

import { Piece } from "./piece";
import { Position } from "./types";

export class Board {
    grid: (Piece | null) [][];
    obstacles: Position[];


    constructor(public size: number = 8) {
        this.grid = Array.from({ length: size }, () => Array(size).fill(null));
        this.obstacles = [];

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

   /* printBoard() {
        for (const row of this.grid) {
            console.log(row.map(cell => (cell ? cell.constructor.name[0] : ".")).join(" "));

        }
    }*/
    placeObstacle(pos: Position) {
        if (this.inBounds(pos)) {
            this.obstacles.push(pos);
        }
    }
    
    isObstacle(pos: Position): boolean {
        return this.obstacles.some(o => o.row === pos.row && o.col === pos.col);
    }
    printBoard() {
        for (let row = 0; row < this.size; row++) {
            let line = "";
            for (let col = 0; col < this.size; col++) {
                if (this.isObstacle({ row, col })) {
                    line += "X ";
                } else {
                    const cell = this.grid[row][col];
                    line += cell ? cell.constructor.name[0] + " " : ". ";
                }
            }
            console.log(line);
        }
    }
    
    
}