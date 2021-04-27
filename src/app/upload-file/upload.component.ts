import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UploadService } from './upload.service';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget & Event;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  constructor(private _upload: UploadService) { }

  fileName = "Selecione um arquivo...";
  files!: Set<File>;
  progress = 0
  subs!: Subscription;

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

  onChange(event: any): void {
    const selectedFiles = <FileList>event.target.files;

    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }

    this.fileName = [...event.target.files].map((file) => `${file.name}`).join(', ');

    this.progress = 0;
  }
 
  onUpload(){
    if(this.files && this.files.size){
      this.subs = this._upload.upload(this.files, "/api/upload")
      .subscribe((event: HttpEvent<Object>) => {
        //HttpEventType
        //console.log(event)
        if(event.type === HttpEventType.Response){
          console.log('Upload concluído')
        } else if (event.type === HttpEventType.UploadProgress){
            const total = event.total ? event.total :  0;
            const percentDone = Math.round(((event.loaded * 100) / total));
            console.log(percentDone)
            this.progress = percentDone;
        }});
    }
  }

  progressCss(){
    return {width: `${this.progress}%`}
  }

  onPdf(){
    this._upload.download('/api/downloadPdf')
    .subscribe((res:any) => {
      this._upload.handleFile(res, 'report.docx')
    });
  }
  
  onExcel(){
    this._upload.download('/api/downloadExcel')
    .subscribe((res:any) => {
      this._upload.handleFile(res, 'report.xlsx')
    });
  }
} 
