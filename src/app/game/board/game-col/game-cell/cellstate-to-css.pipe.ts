import {Pipe, PipeTransform} from '@angular/core';
import {CellStateModel} from 'src/app/models/cell-state.model';

@Pipe({name: 'CellStateToCss'})
export class CellStateToCssPipe implements PipeTransform {

  transform(cellState: CellStateModel): string {
    switch (cellState) {
      case CellStateModel.REAL_PLAYER: return 'real-player';
      case CellStateModel.AI_PLAYER: return 'ai-player';
      case CellStateModel.EMPTY: return 'empty';
      case CellStateModel.HIGHLIGHTED_CELL: return 'highlighted-cell';
    }
  }
}
