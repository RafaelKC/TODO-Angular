import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private _http: HttpClient) { }

  upload(files: Set<File>, url: string){


    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    /* const request = new HttpRequest('POST', url, formData);
    return this._http.request(request); */

    return this._http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    })
  }

}
