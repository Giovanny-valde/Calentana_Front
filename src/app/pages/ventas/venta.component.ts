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

  form: FormGroup;
  formTiendas!: FormGroup;
  ventas: Venta[];
  tiendass: Tienda[];

  constructor(
    private _tiendaService: TiendaService,
    private _ventaService: VentaService,
    private formBuilder: FormBuilder,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res : any) =>{
      // console.log(res.id);
      // this.idRuta = res.id
      this.getTiendas(res.id);
      this.initForm();
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
    for (let i = 0; i < this.tiendass.length; i++) {
      const nuevaTiendaForm = this.formBuilder.group({
        Tienda: [this.tiendass[i]],
        Tradicional: [""],
        Mega: [""],
        Devolucion: [""]
      });
      this.tiendas.push(nuevaTiendaForm);
    }
  }

  getTiendas(id : string) {
    this._tiendaService.getTiendaByRuta(id).subscribe(({data}) => {
      this.tiendass = data
      this.addTienda();
    });

  }

  enviar() {
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
    this._ventaService.saveArrayItems(ventas).subscribe(data => {
      console.log(data);
    })
    console.log(ventas);
  }

  get tiendas() {
    return this.form.get("tiendas") as FormArray;
  }

}
