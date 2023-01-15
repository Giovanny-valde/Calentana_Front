import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cobro } from '../_model/cobro.interface';
import { PageResponse } from '../_model/page-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CobroService extends GenericService<Cobro>{

  constructor(
    protected override _http: HttpClient
  ) {
    super(
      _http,
      `${environment.HOST}/cobros`
    )
  }

  getCobroByTiendaId(id: string) {
    const url = `${environment.HOST}/cobros/byTienda/${id}`;
    return this._http.get<PageResponse<Cobro>>(url);
   }

   getCobroByRutaId(id: string | null ) {
    const url = `${environment.HOST}/cobros/byRuta/${id}`;
    return this._http.get<PageResponse<Cobro>>(url);
   }

}

