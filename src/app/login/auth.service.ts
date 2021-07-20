import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {HttpClient,} from "@angular/common/http";
import {User} from "./models/User";
import {LoginResponse} from "./models/LoginResponse";
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  showMenuEmitter = new EventEmitter<boolean | null | undefined>();
  currentUser = new EventEmitter<User | null | undefined>();

  constructor(
    private _router: Router,
    private _http: HttpClient,
  ) {}

  async login(user: User){
    const result = await this._http.post<LoginResponse>('api/user/login', user).toPromise();
    if(result && result.user && result.token) {
      this.changeAuth(true, `Bearer ${result.token}`);
      await this._router.navigate(['/']);
      return true;
    } else {
        this.changeAuth(false)
        return false;
    }
  }

  async isAuth(): Promise<boolean | null | undefined>{
    const token = this.getAuthorizationToken();
    if(!token) {
      this.exit();
      return false;
    } else if(this.isTokenExpired(token)) {
      this.exit();
      return false;
    }
    const result = await this._http.get<LoginResponse>('api/user/tokenIsValid').toPromise();
    const user = result.user;
    this.currentUser.emit(user);
    this.showMenuEmitter.emit(result.valid);
    return (result.valid);
  }

  exit(){
    this.changeAuth(false);
  }

  private changeAuth(value: boolean, token?: string){
    if(value) {
      if(token != undefined) {
        window.localStorage.setItem(environment.TOKEN, token)
      }
      this.showMenuEmitter.emit(value);
    } else {
      window.localStorage.removeItem(environment.TOKEN);
      this.showMenuEmitter.emit(value);
      this._router.navigate(['/login']);
    }
  }

  public getAuthorizationToken(): string | null{
    return window.localStorage.getItem(environment.TOKEN);
  }

  getTokenExpirationDate(token: string): Date | null {
    const decode: any = jwt_decode(token)

    if (decode.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decode.exp);
    return date;
  }

  public getTokenId(token?: string | null): string {
    if(!token) token = this.getAuthorizationToken();
    if (token){
    const decode: any = jwt_decode(token);
    if(decode.role === undefined) {
      return '';
    }
    return decode.role;
    }
    return '';
  }

  isTokenExpired(token?: string): boolean {
    if(!token)  {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    } if (date != null) {
      return !(date.valueOf() > new Date().valueOf());
    }
    return true;
  }

}
