import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Venta } from '../_model/venta.interface';
import { PageResponse } from '../_model/page-response.interface';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends GenericService<Venta>{

  constructor(
    protected override _http: HttpClient
  ) {
    super(
      _http,
      `${environment.HOST}/ventas`
    )
  }

  pos(id: string) {
    const url = `${environment.HOST}/tiendas/byRuta/${id}`;
    return this._http.post(url , id);
   }

  reporteExcel(data: any) {
      const url = `${environment.HOST}/ventas/reporteExcel`;
      return this._http.post(url , data ,  { responseType: 'blob'});
  }

  ventasByfecha(data: {} )  {
    const url = `${environment.HOST}/ventas/ventasByFechas`;
    return this._http.post<PageResponse<Venta>>(url , data );
  }

  ventasTotalesByfecha(data: {} )  {
    const url = `${environment.HOST}/ventas/ventasTotalesByFechas`;
    return this._http.post<PageResponse<Venta>>(url , data );
  }

}

