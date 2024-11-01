import {Component, OnInit} from '@angular/core';
import {FormControl,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY} from 'rxjs';
import {catchError, map, switchMap, take} from 'rxjs/operators';
import {AlertModalService} from 'src/app/shared/services/alert-modal.service';
import {ToDo} from '../to-do';

import {ToDoService} from '../to-do.service';
import {TodoStatus} from "../todo-status";
import {ToDo2Service} from "../to-do2.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  queryField = new FormControl();
  toDo: ToDo = { title: '', checked: false, data: '', desc: '', id: '0', status: TodoStatus.ToDo, userId: '' }
  originalValue!: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _toDoService: ToDo2Service,
    private _router: Router,
    private _alertService: AlertModalService,
  ) { }

  ngOnInit(): void {
    this._route.params.pipe(
      map((params: any) => params.id),
      switchMap(
        id => this._toDoService.loadById(id)
      ),
      catchError(error => {
        this._router.navigate(['not-found'])
        return EMPTY
      })
    ).subscribe(
      (toDo: ToDo) => {
        this.toDo = toDo;
        this.originalValue = toDo.checked;
        this.queryField.setValue(toDo.checked)
      }
    )

    this.queryField.valueChanges.subscribe(
      (value: boolean) => {
        this.toDo.checked = value
        this._toDoService.save(this.toDo, true).subscribe()
      }
    )

  }

  onDelete() {
    const result$ = this._alertService.showConfirm('Confirmação', `Você tem certeza que deseja excluir a ToDo ${this.toDo.title}? Não terá mais volta.`)
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this._toDoService.remove(this.toDo.id) : EMPTY)
    ).subscribe(
      success => {
        this._router.navigate(['/'])
      },
      erro => {
        this._alertService.showAlertDanger("Desculpa, tivemos um erro ao apagar o ToDo.")
      }
    )
  }

  onEdit() {
    this._router.navigate(['to-do/edit', this.toDo.id])
  }

  statusCss() {
    if (this.toDo.status == TodoStatus.Doing) {
      return 'btn btn-warning';
    }
    if (this.toDo.status == TodoStatus.Done) {
      return 'btn btn-success';
    }
    if (this.toDo.status == TodoStatus.ToDo) {
      return 'btn btn-danger';
    }
    return '';
  }

  getStatusTranslate(toDo: ToDo): string  {
    switch (toDo.status) {
      case TodoStatus.Doing: return 'Fazendo';
      case TodoStatus.Done: return 'Feito';
      case TodoStatus.ToDo: return 'Para fazer'
    }
  }

}
