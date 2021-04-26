import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoComponent } from './to-do.component';
import { ToDoRoutingModule } from './to-do-routing.module';
import { RouterModule } from '@angular/router';
import { ToDoFormComponent } from './to-do-form/to-do-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundedComponent } from './not-founded/not-founded.component';
import { ViewComponent } from './view/view.component';



@NgModule({
  declarations: [
    ToDoComponent,
    ToDoFormComponent,
    NotFoundedComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ToDoRoutingModule,
  ],
  exports: [
    ToDoComponent,
  ]
})
export class ToDoModule { }
