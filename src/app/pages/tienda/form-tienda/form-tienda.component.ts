import { Ruta } from 'src/app/_model/ruta.interface';
import { RutaService } from './../../../_service/ruta.service';
import { Tienda } from './../../../_model/tienda.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiendaService } from './../../../_service/tienda.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-tienda',
  templateUrl: './form-tienda.component.html',
  styleUrls: ['./form-tienda.component.css']
})
export class FormTiendaComponent implements OnInit {

  idRuta: string | null;
  localStorage = localStorage
  form: FormGroup;
  tiendas: Tienda[];
  rutas: Ruta[];
  tienda: Tienda;

  constructor(
    private _tiendaService: TiendaService,
    private _formBuilder: FormBuilder,
    private _rutaService: RutaService,
    public _activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.getTiendas();
    this.getRutas(),
    this.initForm();
    this.validation();
  }

  validation(){
    if(localStorage.getItem('admin') == null){
      this.idRuta = localStorage.getItem("idRuta")
      this.form.controls["Ruta"].setValue(this.idRuta);
    }
  }

  emptyForm() {
    this.form = this._formBuilder.group({
      Id: [null],
      Nombre: [null, [Validators.required]],
      Dueno: [null, [Validators.required]],
      Nit: [null],
      Telefono: [null],
      Direccion: [null],
      Barrio: [null, [Validators.required]],
      Ruta: [null, [Validators.required]]
    });
  }

  editForm() {
    this.form = this._formBuilder.group({
      Id: [this.tienda.Id],
      Nombre: [this.tienda.Nombre, [Validators.required]],
      Dueno: [this.tienda.Dueno, [Validators.required]],
      Nit: [this.tienda.Nit],
      Telefono: [this.tienda.Telefono],
      Direccion: [this.tienda.Direccion, [Validators.required]],
      Barrio: [this.tienda.Barrio, [Validators.required]],
      Ruta: [this.tienda.Ruta.Id, [Validators.required]]
    });
    this.idRuta = this.tienda.Ruta.Id;
  }

  initForm() {
    this.emptyForm();
    if (this.tienda) {
      this.editForm();
    }
  }

  operate() {
    let rawValuesForm = this.form.getRawValue();

    let tienda: Tienda = {
      ...rawValuesForm
    }

    if (this.tienda) {
      this._tiendaService.updateItem(tienda).subscribe(data => {
        this._tiendaService.setChangeList(this.tiendas);
        this.closeModal();
      });
    } else {
      this._tiendaService.saveItem(tienda).subscribe(data => {
        this._tiendaService.setChangeList(this.tiendas);
        this.closeModal();
      });
    }
  }

  getTiendas() {
    this._tiendaService.getItems().subscribe(data => this.tiendas = data.data);
  }

  getRutas() {
    this._rutaService.getItems().subscribe(data => this.rutas = data.data);
  }

  closeModal() {
    this._activeModal.close();
  }



}
