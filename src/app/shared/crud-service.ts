import { HttpClient } from "@angular/common/http";
import { take } from "rxjs/operators";

export class CrudService<t> {

    constructor(protected _http: HttpClient, private _API_URL:string) { }
    
      list(){
        return this._http.get<t[]>(this._API_URL);
      }
    
      private create(record: t){
        return this._http.post(this._API_URL, record).pipe(
          take(1),
          );
      }
    
      loadById(id:number){
        return this._http.get<t>(`${this._API_URL}/${id}`).pipe(take(1));
      }
    
      private update(record: any){
        return this._http.put(`${this._API_URL}/${record.id}`, record).pipe(take(1))
      }
    
      save(record: any){
        if(record.id){
          return this.update(record);
        }
        return this.create(record);
      }
    
      remove(id: number){
        return this._http.delete(`${this._API_URL}/${id}`).pipe(take(1))
      }
    

}
