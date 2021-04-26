import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundedComponent } from './not-founded/not-founded.component';
import { ToDoFormComponent } from './to-do-form/to-do-form.component';
import { ToDoComponent } from './to-do.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
    { path: '', component: ToDoComponent },
    { path: 'new', component: ToDoFormComponent,},
    { path: 'not-found-toDo', component: NotFoundedComponent },
    { path: 'edit/:id', component: ToDoFormComponent },
    { path: 'view/:id', component: ViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToDoRoutingModule {}
