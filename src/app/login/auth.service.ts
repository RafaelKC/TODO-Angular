import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  email: string;
  password: string;
}

const RKC_TODO_AUTH_KEY = 'rck_auth_key'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  showMenuEmitter = new EventEmitter<boolean>();
  private userAuth: boolean = localStorage[RKC_TODO_AUTH_KEY] ? JSON.parse(localStorage[RKC_TODO_AUTH_KEY]) : false;
  private users: User[] = [
    {
      email: 'rafael@email.com',
      password: '123abc'
    },
    {
      email: 'rafaelkaua@email.com',
      password: 'rafael'
    },
    {
      email: 'joaozinho@email.com',
      password: 'gmail'
    }
  ]

  constructor(
    private _router: Router
  ) {}

  login(user: User){
    const currentUser = this.users.find((v:User) => v.email === user.email);
    if(currentUser){
      if(currentUser.password === user.password){
        this.changeAuth(true)
        this._router.navigate(['/']);
      } else{
        this.changeAuth(false)
      }
    } else {
      this.changeAuth(false)
    }
  }

  isAuth(){
    let local = false
    if(localStorage[RKC_TODO_AUTH_KEY] !== undefined){
      local = JSON.parse(localStorage[RKC_TODO_AUTH_KEY]);
    } 
    if(local){
      this.changeAuth(true);
      return this.userAuth
    } else {
      this.changeAuth(false);
      return this.userAuth
    }
  }

  exit(){
    this.changeAuth(false)
  }

  private changeAuth(value: boolean){
    this.userAuth = value;
    localStorage[RKC_TODO_AUTH_KEY] = JSON.stringify(this.userAuth)
    this.showMenuEmitter.emit(this.userAuth);
  }

}
