import {CellStateModel} from './cell-state.model';
import {Player} from './player.model';

export class Game {

  board: CellStateModel[][] = [];

  private readonly ROWS = 6;
  private readonly COLUMNS = 7;

  constructor() {
    this.initBoard();
  }

  isValidMove(column: number): boolean {
    return this.board[column][0] === CellStateModel.EMPTY;
  }

  getRowDroppedToken(column: number): number {
    if (!this.isValidMove(column)) {
      return -1;
    }

    for (let currentRow = this.ROWS; currentRow >= 0; currentRow--) {
      if (this.board[column][currentRow] === CellStateModel.EMPTY ||
        this.board[column][currentRow] === CellStateModel.HIGHLIGHTED_CELL) {
        return currentRow;
      }
    }

    return -1;
  }

  dropToken(player: Player, column: number): number {
    const row = this.getRowDroppedToken(column);
    if (row === -1) {
      return -1;
    }

    this.board[column][row] = player ===
    Player.REAL_PLAYER ? CellStateModel.REAL_PLAYER : CellStateModel.AI_PLAYER;

    return row;
  }

  isWinMove(player: Player, column: number, row: number): boolean {
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

  highlight(column: number, row: number, hightlight: boolean): void {
    if (this.board[column][row] !== CellStateModel.HIGHLIGHTED_CELL &&
      this.board[column][row] !== CellStateModel.EMPTY) {
      return;
    }

    this.board[column][row] =
      (hightlight ? CellStateModel.HIGHLIGHTED_CELL : CellStateModel.EMPTY);
  }

  reset(): void {
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
}
