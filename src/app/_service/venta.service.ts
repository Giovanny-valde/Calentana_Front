import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Venta } from '../_model/venta.interface';

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
}

