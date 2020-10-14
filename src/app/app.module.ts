import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CelebsComponent } from './admin/celebs/celebs.component';
import { JoinComponent } from './join/join.component';
import { MainComponent } from './main/main.component';
import { PendingComponent } from './admin/pending/pending.component';
import { PlayersComponent } from './admin/players/players.component';
import { SuccessComponent } from './join/success/success.component';
import { TableComponent } from './main/table/table.component';

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    CelebsComponent,
    JoinComponent,
    MainComponent,
    PendingComponent,
    PlayersComponent,
    SuccessComponent,
    TableComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
