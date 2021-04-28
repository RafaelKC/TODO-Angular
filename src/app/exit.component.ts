import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'exit-app',
  template: '',
})
export class ExitComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ){}

  ngOnInit(): void {
    this._authService.exit();
    this._router.navigate(['/login']);
  }
  
}
