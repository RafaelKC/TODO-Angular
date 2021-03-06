import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExitComponent } from './exit.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundedComponent } from './not-founded/not-founded.component';
import {NewUserComponent} from "./login/new-user/new-user.component";
import {NewUserGuard} from "./login/new-user/new-user.guard";


const routes: Routes = [
  {
    path: "", pathMatch: "full", redirectTo: "to-do"
  },
  {
    path: "login", component: LoginComponent,
    canLoad: [NewUserGuard]
  },
  {
      path: "new-user", component: NewUserComponent,
    canLoad: [NewUserGuard]
  },
  {
    path: "exit", component: ExitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'not-found', component: NotFoundedComponent,
  },
  {
    path: 'to-do',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./to-do/to-do.module').then(m => m.ToDoModule)
  },
  { path: '**', pathMatch: "full", redirectTo: "to-do"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
