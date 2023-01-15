import { PageResponse } from './../_model/page-response.interface';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Empleado } from '../_model/empleado.interface';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Ruta } from '../_model/ruta.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends GenericService<Empleado> {

  private $changeList: Subject<Empleado[]> = new Subject<Empleado[]>();
  private $changeMessage: Subject<string> = new Subject<string>();

  constructor( protected override _http: HttpClient) {
    super(
      _http,
      `${environment.HOST}/Empleados`
    )
   }

   setChangeList(lista: Empleado[]) {
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

   getEmpleadoByCedula(cedula: string) {
    const url = `${environment.HOST}/empleados/byCedula/${cedula}`;
    return this._http.get<PageResponse<Ruta>>(url);
   }

}
