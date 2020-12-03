import {Component, Input} from '@angular/core';
import {CellStateModel} from 'src/app/models/cell-state.model';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.scss']
})
export class GameCellComponent {
  @Input() state = CellStateModel.EMPTY;

  constructor() {}

}
