import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DialogComponent} from './dialog/dialog.component';
import {GameGuardService} from './services/game-guard.service';

const routes: Routes = [
  {
    path: 'play',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule),
    canActivate: [GameGuardService]
  },
  {path: '', component: DialogComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
