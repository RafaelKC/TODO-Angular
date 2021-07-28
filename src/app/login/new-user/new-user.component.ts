import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { v4 as uuid } from 'uuid';
import {AuthService} from "../auth.service";
import {User} from "../models/User";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  public form!: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.crateForm()
  }

  private crateForm(): void {
    this.form = this._formBuilder.group({
      id: [null, Validators.required],
      primeiroNome: [null, Validators.required],
      segundoNome: [null, Validators.required],
      userName: [null, Validators.required],
      login: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onSubmit() {
    var userName = this.form.get('primeiroNome')?.value + ' ' + this.form.get('segundoNome')?.value;
    this.form.get('id')?.setValue(uuid());
    this.form.get('userName')?.setValue(userName);
    if(this.form.valid) {
      const user = this.form.getRawValue() as User;
      if(!this._authService.newUser(user)){
      }
    }
  }

}
