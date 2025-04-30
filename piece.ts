

import { Position, Color } from "./types";

export abstract class Piece {
    constructor( public color: Color, public position: Position) {}

    abstract getPossibleMoves(board: Piece[][]): Position[];
}

export class Rook extends Piece {
    getPossibleMoves(board: Piece[][]): Position[] {
        const moves: Position[] = [];
        for (let i = 0; i < 8; i++){
            if (i !== this.position.row) moves.push({row: i, col: this.position.col });
            if (i !== this.position.col) moves.push({row: this.position.row, col: i });

        }
        return moves;
    }
}

export class Amazon extends Piece {
    getPossibleMoves(board: Piece[][]): Position[] {
        const moves: Position[] = [];

        for (let i = 0; i < 8; i++) {
            if (i !== this.position.row) moves.push({row: i, col: this.position.col });
            if (i !== this.position.col) moves.push({row: this.position.row, col: i });
            
            const delta = 1 - this.position.row;
            moves.push({ row: this.position.row + delta, col: this.position.col + delta });
            moves.push({ row: this.position.row + delta, col: this.position.col - delta });

        }

        const knightMoves = [
            { dr: 2, dc: 1 }, { dr: 1, dc: 2 }, { dr: -1, dc: 2 }, { dr: -2, dc: 1 },
            { dr: -2, dc: -1 }, { dr: -1, dc: -2 }, { dr: 1, dc: -2 }, { dr: 2, dc: -1 },
        ];
        for (const move of knightMoves) {
            moves.push({ row: this.position.row + move.dr, col: this.position.col + move.dc });
        }
        return moves;
    }
}

export class King extends Piece {
    getPossibleMoves(board: Piece[][]): Position[] {
        const directions = [
            { dr: -1, dc: -1 }, { dr: -1, dc: 0 }, { dr: -1, dc: 1 },
            { dr: 0, dc: -1 },                  { dr: 0, dc: 1 },
            { dr: 1, dc: -1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 },
        ];

        const moves: Position[] = [];
        for (const { dr, dc } of directions) {
            const newRow = this.position.row + dr;
            const newCol = this.position.col + dc;
            if (
                newRow>= 0 && newRow < board.length &&
                newCol >= 0 && newCol < board[0].length
            ){
                moves.push({ row: newRow, col: newCol });
            }
        }
        return moves;
    }
}