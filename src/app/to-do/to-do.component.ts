import { Component, OnInit } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router"

import { AlertModalService } from '../shared/services/alert-modal.service';
import { ToDo } from './to-do';
import { ToDoService } from './to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  toDos$!: Observable<ToDo[]>;
  error$ = new Subject<boolean>();

  constructor(
    private _toDoService: ToDoService,
    private _alertService: AlertModalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.onRefresh()
  }

  statusCss(status: string){
    if(status == 'doing'){
      return 'btn btn-warning';
    }
    if(status == 'done'){
      return 'btn btn-success';
    }
    if(status == 'to-do'){
      return 'btn btn-danger';
    }
    return '';
  }

  onRemove(){
    console.log(this.toDos$)
  }

  onRefresh(){
    this.toDos$ = this._toDoService.list()
    .pipe(
      catchError((error) => {
        this._alertService.showAlertDanger("Erro ao carregar TO-DOs, tente novamente mais tarde.")
        return empty();
      })
    );
  }

  onCheckChange(e:Event, id:number=0){
    console.log(e);
    console.log(id)
  }

  onEdit(id:number=0){
    console.log(id)
    this._router.navigate(['edit', id], { relativeTo: this._route })
  }

}
