import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment';
import { catchError, delay, take } from 'rxjs/operators';

import { ToDo } from './to-do';
import { Router } from '@angular/router';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private readonly API = `${environment.API}/to-do`

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  list(){
    return this._http.get<ToDo[]>(this.API);
  }

  create(toDo: ToDo){
    return this._http.post(this.API, toDo).pipe(
      take(1),
      catchError(error => {

        this._router.navigate(['not-found-toDo']);
        console.log('s')
        return empty
      })
      );
  }

  loadById(id:number){
    return this._http.get<ToDo>(`${this.API}/${id}`).pipe(take(1));
  }

}
