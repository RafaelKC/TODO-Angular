import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router"

import { AlertModalService } from '../shared/services/alert-modal.service';
import { ToDo } from './to-do';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToDo2Service } from './to-do2.service';
import {TodoStatus} from "./todo-status";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  toDos$!: Observable<ToDo[]>;
  error$ = new Subject<boolean>();
  deleteModalRaf!: BsModalRef;

  constructor(
    private _toDoService: ToDo2Service,
    private _alertService: AlertModalService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
   this.onRefresh()
  }

  statusCss(status: TodoStatus){
    if(status == TodoStatus.Doing){
      return 'btn btn-warning';
    }
    if(status == TodoStatus.Done){
      return 'btn btn-success';
    }
    if(status == TodoStatus.ToDo){
      return 'btn btn-danger';
    }
    return '';
  }

  onRemove(toDo: ToDo){
    const result$ = this._alertService.showConfirm("Confirmação", "Tem certeza que deseja remover o ToDo?")
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this._toDoService.remove(toDo.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh()
        },
        erro => {
          this._alertService.showAlertDanger("Erro ao remover ToDo, tente depois."
          )},
      )
  }

  onRefresh(){
    this.toDos$ = this._toDoService.list()
    .pipe(
      catchError((error) => {
        this._alertService.showAlertDanger("Erro ao carregar TO-DOs, tente novamente mais tarde.")
        return EMPTY;
      })
    );
  }

  onEdit(id:string="0"){
    this._router.navigate(['edit', id], { relativeTo: this._route })
  }

  onView(id: string){
    this._router.navigate(['to-do/view', id])
  }

  getStatusTranslate(toDo: ToDo): string  {
    switch (toDo.status) {
      case TodoStatus.Doing: return 'Fazendo';
      case TodoStatus.Done: return 'Feito';
      case TodoStatus.ToDo: return 'Para fazer'
    }
  }

}
