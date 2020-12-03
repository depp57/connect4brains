import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GameComponent} from './game/game.component';
import {ScoreboardComponent} from './game/scoreboard/scoreboard.component';
import {BoardComponent} from './game/board/board.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {GameService} from './services/game.service';
import {DialogComponent} from './dialog/dialog.component';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {GameGuardService} from './services/game-guard.service';
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    DialogComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [GameService, GameGuardService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
