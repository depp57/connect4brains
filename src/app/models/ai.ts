import {PlayerModel} from './player.model';
import {Game} from './game';

export interface Ai extends PlayerModel {
  guessMove(game: Game): number;
}
