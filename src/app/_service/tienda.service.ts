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

  constructor(
    protected override _http: HttpClient
  ) {
    super(
      _http,
      `${environment.HOST}/tiendas`
    )
   }

   getTiendaByRuta(id: string) {
    const url = `${environment.HOST}/tiendas/byRuta${id}`;
    return this._http.get<PageResponse<Tienda>>(url);
   }
}
