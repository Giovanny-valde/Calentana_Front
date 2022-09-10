import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoService } from './../../../_service/empleado.service';
import { Empleado } from './../../../_model/empleado.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {

  form: FormGroup;
  empleado: Empleado;
  empleados: Empleado[];

  constructor(
    private _empleadoService: EmpleadoService,
    private _formBuilder: FormBuilder,
    public _activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  emptyForm() {
    this.form = this._formBuilder.group({
      Id: [null],
      Nombre: [null, [Validators.required]],
      Cedula: [null],
      Telefono: [null, [Validators.required]],
    });
  }

  editForm() {
    this.form = this._formBuilder.group({
      Id: [this.empleado.Id, [Validators.required]],
      Nombre: [this.empleado.Nombre, [Validators.required]],
      Cedula: [this.empleado.Cedula],
      Telefono: [this.empleado.Telefono, [Validators.required]],
    })
  }

  initForm() {
    this.emptyForm();
    if (this.empleado) {
      this.editForm();
    }
  }

  operate() {
    let empleado: Empleado = {
      Id: this.form.value["Id"],
      Nombre: this.form.value["Nombre"],
      Cedula: this.form.value["Cedula"],
      Telefono: this.form.value["Telefono"],
    }
    if (this.empleado) {
      this._empleadoService.updateItem(empleado).subscribe(data => {
        console.log(data);
        this._empleadoService.setChangeList(this.empleados);
        this.closeModal();
      });
    } else {
      this._empleadoService.saveItem(empleado).subscribe(data => {
        console.log(data);
        this._empleadoService.setChangeList(this.empleados);
        this.closeModal();
      });
    }
  }

  closeModal() {
    this._activeModal.close();
  }

}
