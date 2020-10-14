import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { CelebsComponent } from './admin/celebs/celebs.component';
import { JoinComponent } from './join/join.component';
import { MainComponent } from './main/main.component';
import { PendingComponent } from './admin/pending/pending.component';
import { PlayersComponent } from './admin/players/players.component';
import { SuccessComponent } from './join/success/success.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'players', pathMatch: 'full' },
      { path: 'celebs', component: CelebsComponent },
      { path: 'pending', component: PendingComponent },
      { path: 'players', component: PlayersComponent },
    ]
  },
  { path: 'join', component: JoinComponent },
  { path: 'main', component: MainComponent },
  { path: 'success', component: SuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
