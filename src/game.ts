import { AppTitle, NoWinner, NumberOfRounds } from './constants'
import { clear, writeHorizontalLine, writeLine, writeTitle } from './output'
import { calculateWinner } from './winCalculator'
import { createPlayers } from './playerFactory'
import { playMoves } from './moves'
import { ResultType } from './interfaces'
import fileWrite from './fileWrite'
const fs = require("fs");
var p1:number=0;
var p2:number=0;
const play = () => {

  var fileData:string = '';
  clear()
  writeTitle(AppTitle)
  fileData += '-----' + AppTitle +'-----\n';

  writeLine(`Playing ${NumberOfRounds} Rounds...`)
  fileData += `\nPlaying ${NumberOfRounds} Rounds...\n`;
  writeHorizontalLine()

  const players = createPlayers()


  for (let round = 1; round <= NumberOfRounds; round++) {
    writeLine(`Round ${round}`)
    fileData += `\nRound ${round}\n`;

    const moves = playMoves(players)
    const winner = calculateWinner(moves)
    writeLine(`${players.player1.name} plays ${moves.player1Move.move}`)
    fileData += `${players.player1.name} plays ${moves.player1Move.move}\n`;

    writeLine(`${players.player2.name} plays ${moves.player2Move.move}`)
    fileData += `${players.player2.name} plays ${moves.player2Move.move}\n`;

    switch (winner.kind) {
      case ResultType.PlayerWins:

        writeLine(`${winner.move.player.name} wins`);
        fileData += `${winner.move.player.name} wins\n`;
        
        extractInfo(winner.move.player.name);
        // const itif = (winner.move.player.name = "Player 1") ? p1++ : p2++;
        break;
      case ResultType.Draw:
        writeLine(NoWinner);
        fileData += `${NoWinner} \n`;
        break;
    }
    writeHorizontalLine()
  }

  writeLine("Final Game Result ")
  fileData += "\nFinal Game Result\n";
  writeHorizontalLine();
  (p1 > p2) ? writeLine("Player 1 Wins\n") :  writeLine("Player 2 Wins\n");
  (p1 > p2) ? fileData += `Player 1 Wins\n`: fileData += `Player 2 Wins\n`
  writeLine(`Total Wins Of Player1 : ${p1}`)
  fileData += `Total Wins Of Player1 : ${p1}\n`;

  writeLine(`Total Wins Of Player2 : ${p2}`)
  fileData += `Total Wins Of Player2 : ${p2}\n`;
  console.log(p1,p2);
  

  writeLine(`Total draw : ${NumberOfRounds-(p1+p2)}`)
  fileData += `Total draw : ${NumberOfRounds-(p1+p2)}\n`;

  fileWrite(fileData)
}

export const extractInfo = (Info: any) : number => {
  if (Info == 'Player 1') {
    return p1++
    }
   return p2++;
  };

export { play }