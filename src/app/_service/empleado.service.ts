import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Empleado } from './../_model/empleado.interface';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
}
