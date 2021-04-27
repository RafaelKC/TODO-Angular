import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", pathMatch: "full", redirectTo: "search",
  },
  {
    path: 'to-do', 
    loadChildren: () => import('./to-do/to-do.module').then(m => m.ToDoModule)
  },
  {
    path: 'upload', 
    loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule)
  },
  {
    path: 'search', 
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
