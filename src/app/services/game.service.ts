import {Injectable, OnDestroy} from '@angular/core';
import {Player, PlayerModel} from '../models/player.model';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {ScoreService} from './score.service';
import {AiRandom} from '../models/ai-random';
import {Ai} from '../models/ai';
import {Game} from '../models/game';
import {CellStateModel} from '../models/cell-state.model';


@Injectable({providedIn: 'root'})
export class GameService implements OnDestroy {
  players!: [PlayerModel, Ai];
  winnerSubject = new Subject<Player>();

  private game!: Game;
  private currentPlayerTurn: BehaviorSubject<Player>;
  private currentPlayerTurnSubscription!: Subscription;
  private highlightedCellRow = -1;

  private static getRandomPlayer(): Player {
    return (Math.random() > 0.5) ? Player.REAL_PLAYER : Player.AI;
  }

  constructor(private scoreService: ScoreService) {
    this.currentPlayerTurn = new BehaviorSubject<Player>(GameService.getRandomPlayer());
  }

  startGame(playerName: string): void {
    this.players = [
      new PlayerModel(playerName),
      new AiRandom()
    ];

    this.game = new Game();
    this.scoreService.initPlayers(this.players);
    this.initAi();
  }

  dropToken(player: Player, column: number): boolean {
    const row = this.game.dropToken(player, column);

    if (row !== -1) {
      if (this.game.isWinMove(player, column, row)) {
        this.win(player);
      }
      else {
        this.currentPlayerTurn.next(this.currentPlayerTurn.getValue() ===
        Player.REAL_PLAYER ? Player.AI : Player.REAL_PLAYER);
      }
    }

    return row !== -1;
  }

  highlight(column: number, highlight: boolean): void {
    if (highlight) {
      this.highlightedCellRow = this.game.getRowDroppedToken(column);
    }

    this.game.highlight(column, this.highlightedCellRow, highlight);
  }

  getBoard(): CellStateModel[][] {
    return this.game.board;
  }

  isPlayerTurn(player: Player): boolean {
    return this.currentPlayerTurn.getValue() === player;
  }

  isStarted(): boolean {
    return this.players !== undefined;
  }

  ngOnDestroy(): void {
    this.currentPlayerTurnSubscription.unsubscribe();
  }

  private win(player: Player): void {
    this.winnerSubject.next(player);
    this.scoreService.addScore(player);
    this.reset();
  }

  private initAi(): void {
    this.currentPlayerTurnSubscription = this.currentPlayerTurn.subscribe(
      player => {
        if (player === Player.AI) {
          // Ai plays here
          const column = this.players[player].guessMove(this.game);
          this.dropToken(player, column);
        }
      }
    );
  }

  private reset(): void {
    this.currentPlayerTurnSubscription.unsubscribe();
    this.currentPlayerTurn.next(GameService.getRandomPlayer());

    this.game.reset();
    this.initAi();
  }
}
