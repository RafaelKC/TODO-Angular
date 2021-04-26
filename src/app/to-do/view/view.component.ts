import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { ToDo } from '../to-do';

import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  toDo: ToDo = {title: '', checked: false, data: '', desc: '', id: 0, status: ''}
  form!: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _toDoService: ToDoService,
    private _router: Router,
    private _alertService: AlertModalService,
    private _formBuilder: FormBuilder 
  ) { }

  ngOnInit(): void {
    this._route.params.pipe(
      map((params: any) => params.id),
      switchMap(
        id => this._toDoService.loadById(id)
      ),
      catchError(error => {
        this._router.navigate(['to-do/not-found-toDo'])
        return EMPTY
      })
    ).subscribe(
      (toDo: ToDo) => {
        console.log(toDo)
        this.toDo = toDo
        this.form.get('checked')?.patchValue({
          checked: false
        })
      }
    )

    this. form = this._formBuilder.group({
      checked: [false]
    })

    this.form.get('checked')?.valueChanges.subscribe(
      (event: Event) => {
        this.toDo.checked = this.form.get('checked')?.value;
        console.log(this.toDo.checked)
      }
    )

  }

  ngOnDestroy(){
    this._toDoService.save(this.toDo)
  }


  onDelete(){
    const result$ = this._alertService.showConfirm('Confirmação' ,`Você tem certeza que deseja excluir a ToDo ${this.toDo.title}? Não terá mais volta.`)
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

  onEdit(){
    this._router.navigate(['to-do/edit', this.toDo.id])
  }

  statusCss(){
    if(this.toDo.status == 'doing'){
      return 'btn btn-warning';
    }
    if(this.toDo.status == 'done'){
      return 'btn btn-success';
    }
    if(this.toDo.status == 'to-do'){
      return 'btn btn-danger';
    }
    return '';
  }

}
