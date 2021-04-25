import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

import { ToDo } from './to-do';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private readonly API = `${environment.API}/to-do`

  constructor(
    private _http: HttpClient,
  ) { }

  list(){
    return this._http.get<ToDo[]>(this.API);
  }

  private create(toDo: ToDo){
    return this._http.post(this.API, toDo).pipe(
      take(1),
      );
  }

  loadById(id:number){
    return this._http.get<ToDo>(`${this.API}/${id}`).pipe(take(1));
  }

  private updateToDo(toDo:ToDo){
    return this._http.put(`${this.API}/${toDo.id}`, toDo).pipe(take(1))
  }

  save(toDo: ToDo){
    if(toDo.id){
      return this.updateToDo(toDo);
    }
    return this.create(toDo);
  }

  remove(id: number){
    return this._http.delete(`${this.API}/${id}`).pipe(take(1))
  }

}
