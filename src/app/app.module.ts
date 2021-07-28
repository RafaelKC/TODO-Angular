import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExitComponent } from './exit.component';
import { NotFoundedComponent } from './not-founded/not-founded.component';
import {httpInterceptorsProvider} from "./http-interceptors";
import { NewUserComponent } from './login/new-user/new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExitComponent,
    NotFoundedComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorsProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
