import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Ruta } from '../_model/ruta.interface';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { PageResponse } from '../_model/page-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RutaService extends GenericService<Ruta> {

  private $changeList: Subject<Ruta[]> = new Subject<Ruta[]>();
  private $changeMessage: Subject<string> = new Subject<string>();

  constructor(
    protected override _http: HttpClient
  ) {
    super(
      _http,
      `${environment.HOST}/rutas`
    )
   }

   setChangeList(lista: Ruta[]) {
    this.$changeList.next(lista)
   }

   getChangeList() {
    return this.$changeList.asObservable()
   }

   setChangeMessage(message: string) {
    this.$changeMessage.next(message)
   }

   getChangeMessage() {
    return this.$changeMessage.asObservable()
   }

   getRutaByEmpleado(id: string) {
    const url = `${environment.HOST}/rutas/byEmpleado/${id}`;
    return this._http.get<PageResponse<Ruta>>(url);
   }


}
