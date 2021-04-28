import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isAuth = false;

  constructor(
    private _authService: AuthService
  ){}

  ngOnInit(): void {
    this._authService.showMenuEmitter.subscribe(
      value => {
      this.isAuth = value
      })
  }

}
