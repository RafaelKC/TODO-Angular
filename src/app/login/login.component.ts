import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  emailIsValid: boolean = false;
  passwordValid = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
  ) { }


  ngOnInit(): void {
    this._authService.showMenuEmitter.emit(false);
    this.formLogin = this._formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
      password: [null, [ Validators.required]]
    });

    this.formLogin.get('email')?.valueChanges.subscribe(
      e => {
        if(this.formLogin.get('email')?.valid){
          this.emailIsValid = true;
        } else {
          this.emailIsValid = false;
        }
      }
    )

    this.formLogin.get('password')?.statusChanges.subscribe(
      e => e ? this.passwordValid = '' : this.passwordValid = 'is-invalid'
    )

  }

  async onSubmit() {
    if(this.formLogin.valid){
      if(!await this._authService.login(this.formLogin.value)){
        this.emailIsValid = false;
        this.passwordValid = 'is-invalid';
      }
    } else {
      this.emailIsValid = false;
      this.passwordValid = 'is-invalid';
    }
  }

  errorCssEmail(){
    if(this.formLogin.get('email')?.touched){
      if(this.emailIsValid){
        return 'is-valid';
      }
      return 'is-invalid';
    }
    return '';
  }

  onNewUser(){
    this._router.navigate(['/new-user'])
  }

}
