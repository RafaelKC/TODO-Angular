import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { ToDo } from '../to-do/to-do';
import { ToDoService } from '../to-do/to-do.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoResolver implements Resolve<ToDo> {

  constructor(private _toDoService: ToDoService){
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<ToDo> {

    const toDo: ToDo = { title: '', status: '', checked: false, data: ''}

    if(route?.params['id']){
      return this._toDoService.loadById(route?.params['id'])
    }
    return of(toDo);
  }
}
