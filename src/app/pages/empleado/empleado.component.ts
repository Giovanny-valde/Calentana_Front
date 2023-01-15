import { startWith, map } from 'rxjs/operators';
import { FormEmpleadoComponent } from './form-empleado/form-empleado.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoService } from './../../_service/empleado.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Empleado } from './../../_model/empleado.interface';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {




  page: any = 1;
  pageSize: any = 4;
  collectionSize: any = 5

  empleados: Empleado[];
  empleados$: Observable<Empleado[]>;
  filter: FormControl = new FormControl('');

  constructor(
    private _empleadoService: EmpleadoService,
    private _modalService: NgbModal,
    private spinner : NgxSpinnerService,
    
  ) {

  }

  ngOnInit(): void {
    this.getEmpleados();
    this._empleadoService.getChangeList().subscribe(() => this.getEmpleados())

  }

  openModal(empleado?: Empleado) {
    let modal = this._modalService.open(FormEmpleadoComponent)
    modal.componentInstance.empleado = empleado;
  }

  eliminar(id: string) {
     this._empleadoService.deleteItem(id).subscribe(res => {console.log(res);
      this._empleadoService.setChangeList(this.empleados);
    })
  }

  getEmpleados() {
    this.spinner.show();
    this._empleadoService.getItems().subscribe(data => {
      this.empleados = data.data;
      this.spinner.hide();
      this.tableFilter();
    });
  }

  tableFilter() {
    this.empleados$ = this.filter.valueChanges.pipe(
      startWith(''),
      //debounceTime(300),
      map(text => this.search(text))
    );
  }

  search(text: string): Empleado[] {

    return this.empleados.filter(val => {
      const term = text.toLowerCase();
      return val.Nombre.toLowerCase().includes(term) ||
      val.Nombre.toLowerCase().includes(term) ||
      val.Cedula.toString().toLowerCase().includes(term) ||
      val.Telefono.toString().toLowerCase().includes(term)
    });
  }

}
