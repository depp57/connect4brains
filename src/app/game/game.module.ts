import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoardComponent} from './board/board.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {GameComponent} from './game.component';
import {CardModule} from 'primeng/card';
import {GameRoutingModule} from './game-routing.module';
import {GameColComponent} from './board/game-col/game-col.component';
import {GameCellComponent} from './board/game-col/game-cell/game-cell.component';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [
    BoardComponent,
    ScoreboardComponent,
    GameComponent,
    GameColComponent,
    GameCellComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    GameRoutingModule,
    ToastModule
  ]
})
export class GameModule { }
