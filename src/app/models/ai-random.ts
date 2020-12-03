import {Ai} from './ai';
import {PlayerModel} from './player.model';
import {Game} from './game';

export class AiRandom extends PlayerModel implements Ai {

  constructor() {
    super('Goblin');
  }

  guessMove(game: Game): number {
    // tslint:disable-next-line:no-bitwise Bitwise float -> int
    let randomColumn = (Math.random() * game.COLUMNS) | 0;

    while (!game.isValidMove(randomColumn)) {
      randomColumn = Math.random() * game.COLUMNS;
    }

    return randomColumn;
  }

}
