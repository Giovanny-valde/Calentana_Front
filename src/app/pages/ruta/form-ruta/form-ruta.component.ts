import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RutaService } from './../../../_service/ruta.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Ruta } from 'src/app/_model/ruta.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-ruta',
  templateUrl: './form-ruta.component.html',
  styleUrls: ['./form-ruta.component.css']
})
export class FormRutaComponent implements OnInit {

  form: FormGroup;
  rutas: Ruta[];
  ruta: Ruta;

  constructor(
    private _rutaService: RutaService,
    private _formBuilder: FormBuilder,
    public _activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.getRutas();
    this.initForm();
  }

  emptyForm() {
    this.form = this._formBuilder.group({
      Id: [null],
      Nombre: [null, [Validators.required]],
      Cedula: [null],
      Telefono: [null],
    });
  }

  editForm() {
    this.form = this._formBuilder.group({
      Id: [this.ruta.Id, [Validators.required]],
      Nombre: [this.ruta.Nombre, [Validators.required]],
      Cedula: [this.ruta.Cedula],
      Telefono: [this.ruta.Telefono],
    })
  }

  initForm() {
    this.emptyForm();
    if (this.ruta) {
      this.editForm();
    }
  }

  operate() {
    let ruta: Ruta = {
      Id: this.form.value["Id"],
      Nombre: this.form.value["Nombre"],
      Cedula: this.form.value["Cedula"],
      Telefono: this.form.value["Telefono"],
    }
    if (this.ruta) {
      this._rutaService.updateItem(ruta).subscribe(data => {
        console.log(data);
        this._rutaService.setChangeList(this.rutas);
        this.closeModal();
      });
    } else {
      this._rutaService.saveItem(ruta).subscribe(data => {
        console.log(data);
        this.closeModal();
      });
    }
  }

  getRutas() {
    this._rutaService.getItems().subscribe(data => this.rutas = data.data);
  }

  closeModal() {
    this._activeModal.close();
  }

}