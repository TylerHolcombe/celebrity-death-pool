import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinComponent } from './join/join.component';
import { SuccessComponent } from './join/success/success.component';

const routes: Routes = [
  {path: '', redirectTo: 'join', pathMatch: 'full'},
  {path: 'join', component: JoinComponent},
  {path: 'success', component: SuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
