import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {GameService} from './game.service';
import {Injectable} from '@angular/core';

@Injectable()
export class GameGuardService implements CanActivate {

  constructor(private gameService: GameService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.gameService.isStarted()) {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
