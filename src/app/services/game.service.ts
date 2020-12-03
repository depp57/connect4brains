import {Injectable} from '@angular/core';
import {Player, PlayerModel} from '../models/player.model';
import {CellStateModel} from '../models/cell-state.model';
import {Subject} from 'rxjs';
import {ScoreService} from './score.service';


@Injectable({providedIn: 'root'})
export class GameService {
  players!: PlayerModel[];
  board: CellStateModel[][] = [];
  winnerSubject = new Subject<Player>();

  private readonly ROWS = 6;
  private readonly COLUMNS = 7;

  constructor(private scoreService: ScoreService) {}

  startGame(playerName: string): void {
    this.players = [
      new PlayerModel(playerName, 0),
      new PlayerModel('AI', 0)
    ];

    this.scoreService.initPlayers(this.players);
    this.initBoard();
  }

  private initBoard(): void {
    for (let column = 0; column < this.COLUMNS; column++) {
      this.board[column] = [];
      for (let row = 0; row < this.ROWS; row++) {
        this.board[column][row] = CellStateModel.EMPTY;
      }
    }
  }

  public isValidMove(column: number): boolean {
    return this.board[column][0] === CellStateModel.EMPTY;
  }

  public dropToken(player: Player, column: number, justToCheck: boolean = false): number {
    if (!this.isValidMove(column)) {
      return -1;
    }

    let tokenDropped = false;
    let currentRow = this.ROWS;
    while (!tokenDropped) {
      currentRow--;
      if (this.board[column][currentRow] === CellStateModel.EMPTY ||
        this.board[column][currentRow] === CellStateModel.HIGHLIGHTED_CELL) {
        tokenDropped = true;
        if (justToCheck) {
          continue;
        }
        this.board[column][currentRow] = player ===
          Player.REAL_PLAYER ? CellStateModel.REAL_PLAYER : CellStateModel.AI_PLAYER;
      }
    }

    if (!justToCheck && this.isWinMove(player, column, currentRow)) {
      this.win(player);
    }

    return currentRow;
  }

  private win(player: Player): void {
    this.winnerSubject.next(player);
    this.scoreService.addScore(player);
    // TODO reset game ect. !
  }

  private isPlayerToken(player: Player, column: number, row: number): boolean {
    if (column >= 0 && column < this.COLUMNS && row >= 0 && row < this.ROWS) {
      return this.board[column][row] ===
        (player === Player.REAL_PLAYER ? CellStateModel.REAL_PLAYER : CellStateModel.AI_PLAYER);
    }
    else {
      return false;
    }
  }

  private checkAlignement(player: Player, column: number, row: number, xMove: 0 | 1, yMove: 0 | 1 | -1): boolean {
    let continueLeft = true;
    let continueRight = true;
    let currentToken = 1;

    for (let offset = 1; offset < 4; offset++) {
      if (continueRight && this.isPlayerToken(player, column + offset * xMove, row + offset * yMove)) {
        currentToken++;
      }
      else {
        continueRight = false;
      }
      if (continueLeft && this.isPlayerToken(player, column - offset * xMove, row - offset * yMove)) {
        currentToken++;
      }
      else {
        continueLeft = false;
      }
      if (!continueLeft && !continueRight) {
        break;
      }
    }
    return currentToken > 3;
  }

  private isWinMove(player: Player, column: number, row: number): boolean {
    // horizontal check
    if (this.checkAlignement(player, column, row, 1, 0)) {
      return true;
    }

    // vertical check
    if (this.checkAlignement(player, column, row, 0, 1)) {
      return true;
    }

    // diagonal-up right check
    if (this.checkAlignement(player, column, row, 1, 1)) {
      return true;
    }

    // diagonal-down right check
    return this.checkAlignement(player, column, row, 1, -1);
  }

  isStarted(): boolean {
    return this.players !== undefined;
  }

  highlight(column: number, row: number, hightlight: boolean): void {
    if (this.board[column][row] !== CellStateModel.HIGHLIGHTED_CELL &&
      this.board[column][row] !== CellStateModel.EMPTY) {
      return;
    }

    this.board[column][row] =
      (hightlight ? CellStateModel.HIGHLIGHTED_CELL : CellStateModel.EMPTY);
  }
}
