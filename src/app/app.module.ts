import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JoinComponent } from './join/join.component';
import { MainComponent } from './main/main.component';
import { SuccessComponent } from './join/success/success.component';
import { TableComponent } from './main/table/table.component';

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    JoinComponent,
    MainComponent,
    SuccessComponent,
    TableComponent
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
