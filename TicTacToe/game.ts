import Board from "./board.ts";
import Player from "./player.ts";
import * as readline from "readline";
import Symbols from "./sysmbols.ts";
import GameStatus from "./gamesStatus.ts";

class Game {
    private size: number;
    private board: Board;
    private symbols: typeof Symbols;
    private rl: readline.Interface;
    private players: Player[];
    private gameStatus: string;
    constructor(size: number) {
        this.size = size;
        this.board = new Board(this.size);
        this.symbols = Symbols;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.players = [];
        this.gameStatus = GameStatus["Not_Started"];
    }
    start() {
        this.board.startBoard();
        this.gameStatus = GameStatus["In-Progress"];
        this.rl.question("What is Player one name? ", (answer: string) => {
            this.players.push(new Player(answer));
            this.rl.question("Pick any symbol [" + Object.values(this.symbols) + "]: ", (answer: string) => {
                if (!(Object.values(Symbols) as string[]).includes(answer)) {
                    console.log(answer + " is a wrong symbol")
                    this.gameStatus = GameStatus.Cancelled;
                    this.rl.close()
                }
                this.players[this.players.length - 1].symbol = answer.toLowerCase();
                this.rl.question("What is Player two name? ", (answer: string) => {

                    this.players.push(new Player(answer));
                    if (this.players[this.players.length - 2].symbol == "x") {
                        this.players[this.players.length - 1].symbol = "o";
                    } else {
                        this.players[this.players.length - 1].symbol = "x";
                    }
                    this.rl.question("Start Game: y? ", (answer: string) => {

                        if (answer.toLowerCase() === "y") {
                            this.startGame();
                        } else {
                            this.gameStatus = GameStatus.Cancelled;
                            console.log("Thank you!!!!");
                            this.rl.close();
                            return;
                        }

                    });
                });
            });
        });


    }
    async startGame() {
        let cur_num = 0;
        let continueGame = true;
        while (!this.board.isFull() && continueGame) {
            this.board.printBoard();
            let cur_player = this.players[cur_num % this.players.length];
            const answer = await this.ask(cur_player.getName() +
                " Pick number to place your symbol: ")
            let i = Math.floor((Number(answer) - 1) / this.size);
            let j = (Number(answer) - 1) % this.size;
            if (!this.board.placeSymbol(i, j, cur_player.symbol)) {
                console.log("Invalid number selected");
                continueGame = false;

            }
            if (this.board.checkCol(i, j) || this.board.checkRow(i, j) || this.board.checkDiag(i, j)) {
                this.board.printBoard();
                this.gameStatus = GameStatus.Won;
                console.log(cur_player.getName() + " won !!!!!! 🥳");
                continueGame = false;
                break;
            }
            cur_num++;

        }

        if (this.gameStatus != GameStatus.Won && this.gameStatus != GameStatus.Cancelled) {
            this.gameStatus =GameStatus.Ended;
            console.log("Game result is draw ☹️")
        }
        this.rl.close();
    }
    ask(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(question, resolve);
        });
    }
}

const b = new Game(3);
b.start();






