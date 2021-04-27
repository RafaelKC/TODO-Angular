import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "", pathMatch: "full", redirectTo: "to-do",
  },
  {
    path: "login", component: LoginComponent,
  },
  {
    path: 'to-do', 
    loadChildren: () => import('./to-do/to-do.module').then(m => m.ToDoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
