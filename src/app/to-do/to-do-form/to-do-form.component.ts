import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from '../../shared/services/alert-modal.service';
import { Location } from '@angular/common';


import { ActivatedRoute, Router, } from '@angular/router';
import { ToDo } from '../to-do';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ToDo2Service } from '../to-do2.service';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss']
})
export class ToDoFormComponent implements OnInit {

  form!: FormGroup;
  dataPattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _toDoService: ToDo2Service,
    private _alertService: AlertModalService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {

    if(this.isEdit()){
      this._route.params
      .pipe(
        map((params: any) => params.id),
        switchMap(
            id => this._toDoService.loadById(id))
          ).pipe(catchError(e => {
            this._router.navigate(['to-do/not-found-toDo'])
            return EMPTY
          }))
      .subscribe( 
        (toDo: ToDo) => this.updateForm(toDo)
      );
    }


    this.form = this._formBuilder.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      data: [null, [Validators.required, Validators.pattern(this.dataPattern)]],
      checked: [false],
      status: [null, Validators.required]
    })

  }

  isEdit(){
    if(this._route.snapshot.routeConfig?.path === "new"){
      return false
    }
    return true
  }

  updateForm(toDo:ToDo){
    this.form.patchValue({
      title: toDo.title,
      id: toDo.id,
      data: toDo.data,
      checked: toDo.checked,
      status: toDo.status 
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
      this._toDoService.save(this.form.value).subscribe(
        success => {
          this._alertService.showAlertSuccess("Salvo com sucesso.");
          this._router.navigate(['./'])
        },
        error => this._alertService.showAlertDanger("Desculpa, mas tivemos algum erro. Tente novamente.")
      )
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset()
  }

  onDelete(){
    const result$ = this._alertService.showConfirm("Confirmação", "Tem certeza que deseja remover o ToDo?");
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this._toDoService.remove(this.form.get('id')?.value) : EMPTY)
      ) 
      .subscribe(
        success => {
          this._location.back();
        },
        erro => {
          this._alertService.showAlertDanger("Erro ao remover ToDo, tente depois."
          )},

    )
  }

  hasError(name:string){
    return this.form.get(name)?.errors;
  }

  applyCss(name: string){
    if(this.submitted){
      if(this.hasError(name)){
        return 'is-invalid'
      }
      return 'is-valid'
    }
    return ''
  }

}