import { Subject } from 'rxjs';
import { PageResponse } from './../_model/page-response.interface';
import { HttpClient } from '@angular/common/http';
import { Tienda } from './../_model/tienda.interface';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiendaService extends GenericService<Tienda> {

  private $changeList: Subject<Tienda[]> = new Subject<Tienda[]>();
  private $changeMessage: Subject<string> = new Subject<string>();

  constructor(
    protected override _http: HttpClient
  ) {
    super(
      _http,
      `${environment.HOST}/tiendas`
    )
   }

   getTiendaByRuta(id: string | null) {
    const url = `${environment.HOST}/tiendas/byRuta/${id}`;
    return this._http.get<PageResponse<Tienda>>(url);
   }

   setChangeList(lista: Tienda[]) {
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
}

