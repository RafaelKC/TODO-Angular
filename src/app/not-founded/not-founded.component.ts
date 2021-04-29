import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-founded',
  templateUrl: './not-founded.component.html',
  styleUrls: ['./not-founded.component.scss']
})
export class NotFoundedComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  onHome(){
    this._router.navigate(['/'])
  }

}
