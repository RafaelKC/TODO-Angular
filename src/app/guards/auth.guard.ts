import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../login/auth.service';
import { AlertModalService } from '../shared/services/alert-modal.service';
import { ToDoFormComponent } from '../to-do/to-do-form/to-do-form.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<ToDoFormComponent>, CanLoad {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if (this._authService.isAuth()) {
      console.log(this._authService.isAuth())
      return true;
    } else {
      this._router.navigate(['/login']);
      return false
    }
  }
  canDeactivate(
    component: ToDoFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | boolean {
    return component.canExit();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._authService.isAuth()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false
    }
  }
}
