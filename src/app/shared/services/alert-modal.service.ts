import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'  
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {


  constructor(
    private _modalService: BsModalService
  ) { }

    private showAlert(massage: string, type: string, dismissTimeout?: number){
      const bsModalRef: BsModalRef = this._modalService.show(AlertModalComponent);
      bsModalRef.content.type = type;
      bsModalRef.content.massage = massage; 

      if(dismissTimeout){
        setTimeout(() => bsModalRef.hide(), dismissTimeout)
      }
    }


  showAlertDanger(massage:string){
    this.showAlert(massage, AlertTypes.DANGER)
  }

  showAlertSuccess(massage:string){
    this.showAlert(massage, AlertTypes.SUCCESS, 3000)
  }
}
