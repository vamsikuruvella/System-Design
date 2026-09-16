import Board from "./board.ts";
import Player from "./player.ts";
import * as readline from "readline";

const Symbols = { "x": "x", "o": "o" };

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const b = new Board(3);
b.startBoard();

let players: Player[] = [];
rl.question("What is Player one name? ", (answer: string) => {
    players.push(new Player(answer));
    rl.question("Pick any symbol [" + Object.values(Symbols) + "]: ", (answer: string) => {
        if (!(Object.values(Symbols) as string[]).includes(answer)) {
            console.log(answer + " is a wrong symbol")
            rl.close()
        }
        players[players.length - 1].symbol = answer.toLowerCase();
        rl.question("What is Player two name? ", (answer: string) => {

            players.push(new Player(answer));
            if (players[players.length - 2].symbol == "x") {
                players[players.length - 1].symbol = "o";
            } else {
                players[players.length - 1].symbol = "x";
            }
            rl.question("Start Game: y? ", (answer: string) => {

                if (answer.toLowerCase() === "y") {
                    startGame();
                } else {
                    console.log("Thank you!!!!");
                    rl.close();
                }

            });
        });
    });
});

async function startGame() {
    let cur_num = 0;
    let continueGame = true;
    while (!b.isFull() && continueGame) {
        b.printBoard();
        let cur_player = players[cur_num % players.length];
        const answer = await ask(cur_player.getName() +
            " Pick number to place your symbol: ")
        let i = Math.floor((Number(answer) - 1) / 3);
        let j = (Number(answer) - 1) % 3;
        if (!b.placeSymbol(i, j, cur_player.symbol)) {
            console.log("Invalid number selected");
            continueGame = false;
            
        }
        if(b.checkCol(i,j)||b.checkRow(i,j)||b.checkDiag(i,j)){
            b.printBoard();
            console.log(cur_player.getName()+" won !!!!!!");
            continueGame = false;
            break;
        }
        cur_num++;

    }
    
    rl.close();
}

function ask(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}