import { StorageService } from './../../_service/storage.service';
import { map } from 'rxjs/operators';
import { Tienda } from './../../_model/tienda.interface';
import { Venta } from './../../_model/venta.interface';
import { TiendaService } from './../../_service/tienda.service';
import { VentaService } from './../../_service/venta.service';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  id: string | null;

  form: FormGroup;
  formTiendas!: FormGroup;
  ventas: Venta[];
  allTiendas: Tienda[];

  constructor(
    private _tiendaService: TiendaService,
    private _ventaService: VentaService,
    private formBuilder: FormBuilder,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getParamId();
  }

  getParamId(){
    this.activatedRoute.params.subscribe(data =>{
      this.id = localStorage.getItem("idRuta")
      this.initForm();
      this.getTiendas(this.id)
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      tiendas: this.formBuilder.array([])
    })
  }

  operate() {

  }

  addTienda() {
    for (let i = 0; i < this.allTiendas.length; i++) {
      const nuevaTiendaForm = this.formBuilder.group({
        Tienda: [this.allTiendas[i]],
        Tradicional: [""],
        Mega: [""],
        Devolucion: [""]
      });
      this.tiendas.push(nuevaTiendaForm);
    }
  }

  getTiendas(id: string | null) {
    this._tiendaService.getTiendaByRuta(id).subscribe(({data}) => {
      this.allTiendas = data
      this.addTienda();
    });

  }

  save() {
    let form = this.form.value["tiendas"]
    let ventas: Venta[] = []

    for (let element of form) {
      if (element.Tradicional != "" || element.Mega != "" || element.Devolucion != "" ) {

        const obj = {
          ...element,
          Tienda : element.Tienda.Id
        }
        ventas.push(obj)
        //ventas.push(element)

      }
    }
    if(ventas.length == 0) {return}

    this._ventaService.saveArrayItems(ventas).subscribe(data => {
      console.log(data);
    })
    console.log(ventas);
  }

  get tiendas() {
    return this.form.get("tiendas") as FormArray;
  }

}
