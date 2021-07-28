import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../login/auth.service";
import {catchError} from "rxjs/operators";
import {AlertModalService} from "../shared/services/alert-modal.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _alertService: AlertModalService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authService.getAuthorizationToken();
    let request: HttpRequest<any> = req;
    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', token)
      });
    }

    return next.handle(request)
      .pipe(
        catchError(this.handlerError)
      )
  }

  handlerError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent)
    {
      this._alertService.showAlertDanger('Ocorreu um error, tente novamente.');
      console.log(
        `Código do error: ${error.status}\n` +
        `Erro: ${JSON.stringify(error.error)}`);
    } else {
      this._alertService.showAlertDanger('Ocorreu um error com o servidor.\n Tente novamente;');
      console.log(
        `Código do error: ${error.status}\n` +
        `Erro: ${JSON.stringify(error.error)}`);
    }

    return throwError('Ocorreu um error, tente novamente\n'+error.error);
  }
}
