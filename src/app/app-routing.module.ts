import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { JoinComponent } from './join/join.component';
import { MainComponent } from './main/main.component';
import { SuccessComponent } from './join/success/success.component';
import { TableComponent } from './main/table.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'players', component: TableComponent},
  ]},
  {path: 'join', component: JoinComponent},
  {path: 'main', component: MainComponent},
  {path: 'success', component: SuccessComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
