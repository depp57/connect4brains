import {Component, Input} from '@angular/core';
import {CellStateModel} from '../../../models/cell-state.model';

@Component({
  selector: 'app-game-col',
  templateUrl: './game-col.component.html',
  styleUrls: ['./game-col.component.scss']
})
export class GameColComponent {
  @Input() column!: CellStateModel[];

  constructor() {

  }

}
