import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';
import {User} from "./login/models/User";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuth = false
  currentUser = {} as User;

  constructor(
    private _authService: AuthService,
    private _router: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this._authService.showMenuEmitter.subscribe(
      value => {
      value? this.isAuth = value : this.isAuth = false;
      })

    this._authService.currentUser.subscribe(
      value => {
          value? this.currentUser = value : this.currentUser = {} as User;
      }
    )
  }

  public get isntOnLogin(): boolean {
    return !(this._router.snapshot.routeConfig?.path === "login");
  }

  public get showTab(): boolean {
    return this.isAuth && this.isntOnLogin;
  }

}
