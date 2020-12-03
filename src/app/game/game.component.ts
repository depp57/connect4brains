import {Component, OnDestroy} from '@angular/core';
import {GameService} from '../services/game.service';
import {Player, PlayerModel} from '../models/player.model';
import {MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy {
  readonly players: PlayerModel[];
  private winnerSubscription: Subscription;


  constructor(private gameService: GameService, private messageService: MessageService) {
    this.players = this.gameService.players;
    this.winnerSubscription = this.gameService.winnerSubject.subscribe(
      player => this.displayWinner(player)
    );
  }

  private displayWinner(winner: Player): void {
    this.messageService.add({key: 'bc', severity: 'success',
      summary: winner === Player.REAL_PLAYER ? 'Well played' : 'The AI won',
      detail: winner === Player.REAL_PLAYER ? 'You won!' : 'Wanna try again ?'});
  }

  ngOnDestroy(): void {
    this.winnerSubscription.unsubscribe();
  }
}
