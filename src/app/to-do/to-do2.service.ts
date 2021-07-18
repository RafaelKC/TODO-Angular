import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../shared/crud-service';
import { ToDo } from './to-do';

@Injectable({
  providedIn: 'root'
})
export class ToDo2Service extends CrudService<ToDo> {

  constructor(
    protected _http: HttpClient
    ) {
      super(_http, `/api/toDo`);
     }

}
