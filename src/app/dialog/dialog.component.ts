import {Component, OnInit} from '@angular/core';
import {GameService} from '../services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  display = false;
  inputName = 'player1';

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => this.display = true, 300);
  }

  startGame(): void {
    this.gameService.startGame(this.inputName);
    this.router.navigate(['play']).then(() => this.display = false);
  }
}
