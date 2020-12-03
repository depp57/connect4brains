import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {CellStateModel} from '../../models/cell-state.model';
import {Player} from '../../models/player.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: CellStateModel[][];
  highlightedCell = -1;

  constructor(private gameService: GameService) {
    this.board = this.gameService.board;
  }

  ngOnInit(): void {

  }

  onMouseEnter(column: number): void {
    if (this.highlightedCell === -1) {
      this.highlightedCell = this.gameService.dropToken(Player.REAL_PLAYER, column, true);
      this.gameService.highlight(column, this.highlightedCell, true);
    }
  }

  onMouseLeave(column: number): void {
    if (this.highlightedCell !== -1) {
      this.gameService.highlight(column, this.highlightedCell, false);
      this.highlightedCell = -1;
    }
  }

  onMouseClick(column: number): void {
    if (this.gameService.dropToken(Player.REAL_PLAYER, column, false) !== -1) {
      // TODO pass turn
    }
  }
}
