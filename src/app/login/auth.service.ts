import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  showMenuEmitter = new EventEmitter<boolean>();
  private userAuth: boolean = false;
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
        this.userAuth = true;
        this.showMenuEmitter.emit(true);
        this._router.navigate(['/']);
      } else{
        this.showMenuEmitter.emit(false);
        this.userAuth = false;
      }
    } else {
      this.showMenuEmitter.emit(false);
      this.userAuth = false;
    }
  }

  isAuth(){
    return this.userAuth
  }

  exit(){
    this.showMenuEmitter.emit(false);
    this.userAuth = false;
  }

}
