import { Injectable } from '@angular/core';
import {
  Router,
  Route,
  UrlSegment, CanLoad
} from '@angular/router';
import { AuthService } from '../../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewUserGuard implements CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    const isAuth = await this._authService.isAuth();
    if (!isAuth) {
      return true;
    } else {
      this._router.navigate(['/to-do']);
      return false
    }
  }
}
