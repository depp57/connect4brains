import {Ai} from './ai';
import {PlayerModel} from './player.model';
import {Game} from './game';

export class AiRandom extends PlayerModel implements Ai {

  constructor() {
    super('Goblin');
  }

  guessMove(game: Game): number {
    return 0;
  }

}
