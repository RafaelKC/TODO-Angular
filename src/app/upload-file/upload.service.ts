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

  download(url: string){
    return this._http.get(url, {
      responseType: 'blob' as 'json'
    })
  }

  handleFile(res:any, filename: string){
    const file = new Blob([res], {
      type: res.type
    });
    if(window.navigator && window.navigator.msSaveOrOpenBlob != undefined){
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }
    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blob;
    link.download = filename
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }

}
