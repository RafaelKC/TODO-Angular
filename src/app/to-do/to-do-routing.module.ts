import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ToDoFormComponent } from './to-do-form/to-do-form.component';
import { ToDoComponent } from './to-do.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
    { path: '', component: ToDoComponent },
    { path: 'new', component: ToDoFormComponent, canDeactivate: [AuthGuard] },
    { path: 'edit/:id', component: ToDoFormComponent, canDeactivate: [AuthGuard] },
    { path: 'view/:id', component: ViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToDoRoutingModule {}
