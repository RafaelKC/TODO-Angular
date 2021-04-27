import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private _formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
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

  onSubmit(): void {
    if(this.formLogin.valid){
      console.log('Tudo nos confirmes')
    } else {
      console.log('Blhá')
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

}