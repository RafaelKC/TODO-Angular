import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$!: Observable<any>;
  total!: number;
  readonly fields = 'name,version,description,homepage';

  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges.pipe(
      map((value:any) => value.trim()),
      filter(v => v.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      //tap(value => console.log(value)),
      switchMap(value => this._http.get(this.SEARCH_URL, {
        params: {
          search: value,
          fields: this.fields
        }
      })),
      tap((res: any) => this.total = res.total),
      map((res: any) => res.results)

    )
  }

  /* onSearch() {
    const 

    let value = this.queryField.value;
    if (value && value.trim() !== '') {
      value = value.trim()

      const params_ = {
        search: value,
        fields: fields
      };

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);


      this.results$ = this._http.get(this.SEARCH_URL, {params}).pipe(
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      );
    }
  } */

}
