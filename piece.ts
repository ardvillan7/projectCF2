

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