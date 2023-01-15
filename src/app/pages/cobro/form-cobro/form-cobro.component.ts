import { Cobro } from '../../../_model/cobro.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CobroService } from '../../../_service/cobro.service';
import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/_service/tienda.service';
import { Tienda } from 'src/app/_model/tienda.interface';

@Component({
  selector: 'app-form-cobro',
  templateUrl: './form-cobro.component.html',
  styleUrls: ['./form-cobro.component.css']
})
export class FormCobroComponent implements OnInit {

  idRuta: string | null;
  localStorage = localStorage
  form: FormGroup;
  cobroTotal : number = 0
  cobros: Cobro[];
  tiendas: Tienda[];
  cobro: Cobro;

  constructor(
    private _cobroService: CobroService,
    private _formBuilder: FormBuilder,
    private _tiendaService: TiendaService,
    public _activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.validation();
    this.getCobros();
    this.getTiendas();
    this.initForm();
  }

  validation(){
    if(localStorage.getItem('admin') == null){
      this.idRuta = localStorage.getItem("idRuta")
    }
  }

  emptyForm() {
    this.form = this._formBuilder.group({
      Id: [null],
      Tienda : [null , [Validators.required]],
      Valor : [null, [Validators.required]],
      Pago : [false]
    })
  }

  editForm() {
    this.form = this._formBuilder.group({
      Id: [this.cobro.Id],
      Tienda: [this.cobro.Tienda.Id , [Validators.required]],
      Valor :  [null , [Validators.required]],
      Pago :  [false]
    });
      this.form.controls["Tienda"].disable();
    // this.idRuta = this.cobro.Ruta.Id;
  }

  initForm() {
    this.emptyForm();
    if (this.cobro) {
      this.editForm();
    }
  }

  operate() {
    let rawValuesForm = this.form.getRawValue();

    let cobro: Cobro = {
      ...rawValuesForm
    }
    
    this._cobroService.saveItem(cobro).subscribe(data => {
      this.getCobros()
      if(!this.cobro){ this.closeModal() }
    });
  }

  getCobros() {
    if(this.cobro){
      this._cobroService.getCobroByTiendaId(this.cobro?.Tienda.Id).subscribe(({data}) => {
        this.cobros = data
        let valorPagado  = 0, ValorDeber = 0
        for (let i = 0; i < this.cobros.length; i++) {
            this.cobros[i].Pago ? 
              valorPagado += this.cobros[i].Valor : 
              ValorDeber += this.cobros[i].Valor
        }
        this.cobroTotal = ValorDeber - valorPagado
      });
    }
  }

  getTiendas() {
    !this.idRuta ?
      this._tiendaService.getItems().subscribe(({data}) => this.tiendas = data) :
      this._tiendaService.getTiendaByRuta(this.idRuta).subscribe(({data}) => this.tiendas = data);
  }

  closeModal() {
    this._activeModal.close();
  }



}
