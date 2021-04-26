import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", pathMatch: "full", redirectTo: "upload",
  },
  {
    path: 'to-do', 
    loadChildren: () => import('./to-do/to-do.module').then(m => m.ToDoModule)
  },
  {
    path: 'upload', 
    loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
