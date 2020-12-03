import {Injectable} from '@angular/core';
import {Player, PlayerModel} from '../models/player.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ScoreService {
  playerSubject = new Subject<PlayerModel>();
  private players!: PlayerModel[];

  constructor() {}

  initPlayers(players: PlayerModel[]): void {
    this.players = players;
  }

  addScore(player: Player): void {
    this.players[player].score++;
    this.playerSubject.next(this.players[player]);
  }
}
