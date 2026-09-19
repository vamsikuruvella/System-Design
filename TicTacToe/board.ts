// import Symbols from "./sysmbols.ts";

import { error } from "console";

class Board {
    public size: number;
    private board: string[][] = [];
    private populate: number;

    constructor(size: number) {
        this.size = size;
        this.board = [];
        this.populate = 0;
    }

    startBoard() {
        let c = 1;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i]) {
                    this.board[i].push("" + c);

                } else {
                    this.board[i] = ["" + c];
                }
                c++;
            }
        }
    }
    placeSymbol(i: number, j: number, sym: string) {
        if (this.board[i][j] == "x" || this.board[i][j] == "o") {
            return false;
        }
        this.board[i][j] = sym;
        this.populate++;
        return true;
    }

    isFull() {
        return this.populate === this.size * this.size;
    }

    printBoard() {
        try {
            // console.log(this.board);
            if (!this.board.length) {
                throw new Error("Board is Empty");
            }
            for (let i = 0; i < this.size; i++) {
                console.log(this.board[i].join(" | "));
            }
        } catch (ex) {
            if (ex instanceof Error) {
                console.log("Error: " + ex.message);
            }
        }
    }
    checkRow(i: number, j: number) {
        try {
            const cur = this.board[i][j];
            for (let col = 0; col < this.size; col++) {
                if (this.board[i][col] != cur) {
                    return false;
                }
            }
            return true;
        } catch (ex) {
            return "Error: " + ex;
        }
    }

    checkCol(i: number, j: number) {
        try {
            const cur = this.board[i][j];
            for (let row = 0; row < this.size; row++) {
                if (this.board[row][j] != cur) {
                    return false;
                }
            }
            return true;
        } catch (ex) {
            return "Error: " + ex;
        }
    }

    checkDiag(i: number, j: number) {
        try {
            if (i - j == 0 || i + j === this.size - 1) {
                const cur = this.board[i][j];
                if (i - j == 0) {
                    i = 0;
                    j = 0;
                    while (i < this.size && j < this.size) {
                        if (this.board[i][j] != cur) {
                            return false;
                        }
                        i++;
                        j++;
                    }
                    return true;
                } else {
                    i = 0;
                    j = this.size - 1;
                    while (i < this.size && j >= 0) {
                        if (this.board[i][j] != cur) {
                            return false;
                        }
                        i++;
                        j--;
                    }
                    return true;
                }

            } else {
                return false;
            }
        }
        catch (ex) {
            return "error: " + ex;
        }
    }
}

export default Board;