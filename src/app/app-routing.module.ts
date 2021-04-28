import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExitComponent } from './exit.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundedComponent } from './not-founded/not-founded.component';

const routes: Routes = [
  {
    path: "", pathMatch: "full", redirectTo: "to-do"
  },
  {
    path: "login", component: LoginComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
