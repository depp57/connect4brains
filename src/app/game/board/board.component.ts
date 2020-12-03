import {Component} from '@angular/core';
import {GameService} from '../../services/game.service';
import {CellStateModel} from '../../models/cell-state.model';
import {Player} from '../../models/player.model';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  board: CellStateModel[][];

  constructor(private gameService: GameService, private messageService: MessageService) {
    this.board = this.gameService.getBoard(); // TODO maybe error car on recreer la game dont ref perdue
  }

  onMouseEnter(column: number): void {
    this.gameService.highlight(column, true);
  }

  onMouseLeave(column: number): void {
    this.gameService.highlight(column, false);
  }

  onMouseClick(column: number): void {
    if (this.gameService.isPlayerTurn(Player.REAL_PLAYER) &&
        this.gameService.dropToken(Player.REAL_PLAYER, column)) {
    }
    else {
      this.messageService.add({
        key: 'bc',
        severity: 'info',
        summary: 'It\'s not your turn',
        detail: 'Wait for the opponent player',
        life: 1500});
    }
  }
}
