import {Component, Input, OnDestroy} from '@angular/core';
import {PlayerModel} from '../../models/player.model';
import {Subscription} from 'rxjs';
import {ScoreService} from '../../services/score.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnDestroy {

  @Input() player!: PlayerModel;
  private playerSubscription: Subscription;

  constructor(private scoreService: ScoreService) {
    this.playerSubscription = this.scoreService.playerSubject.subscribe(
      player => {
        if (this.player.name === player.name) {
          this.player.score = player.score;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.playerSubscription.unsubscribe();
  }
}
