import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoResolver } from '../guards/to-do.resolver';
import { NotFoundedComponent } from './not-founded/not-founded.component';
import { ToDoFormComponent } from './to-do-form/to-do-form.component';
import { ToDoComponent } from './to-do.component';

const routes: Routes = [
    { path: '', component: ToDoComponent },
    { path: 'new', component: ToDoFormComponent,
    resolve: { toDo: ToDoResolver} },
    { path: 'not-found-toDo', component: NotFoundedComponent },
    { path: 'edit/:id', component: ToDoFormComponent,
    resolve: { toDo: ToDoResolver} },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToDoRoutingModule {}
