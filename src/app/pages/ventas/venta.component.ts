import { Tienda } from './../../_model/tienda.interface';
import { Venta } from './../../_model/venta.interface';
import { TiendaService } from './../../_service/tienda.service';
import { VentaService } from './../../_service/venta.service';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  tradicional : number = 0
  mega : number = 0
  devolucion: number = 0

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
    private spinner : NgxSpinnerService,
    @Inject(LOCALE_ID) private locale: string
    
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
    this.spinner.show()
    this._tiendaService.getTiendaByRuta(id).subscribe(({data}) => {
      this.allTiendas = data
        this.spinner.hide()
        
      this.addTienda();
    });

  }

  save() {
    let form = this.form.value["tiendas"]
    let ventas: Venta[] = []

    for (let element of form) {
      if (element.Tradicional != "" || element.Mega != "" || element.Devolucion != "" ) {
          element.Devolucion = element.Devolucion ? parseInt(element.Devolucion.toString().split('.').join('')) : 0
        element.Tradicional = element.Tradicional ?parseInt(element.Tradicional.toString().split('.').join('')) : 0
        element.Mega = element.Mega ? parseInt(element.Mega.toString().split('.').join('')) : 0
        const obj = {
          ...element,
          Tienda : element.Tienda.Id
        }
        ventas.push(obj)
        //ventas.push(element)
      }
    }
    if(ventas.length == 0) {return}
    this.spinner.show()

    this._ventaService.saveArrayItems(ventas).subscribe(data => {
      console.log(ventas);
      setTimeout(() => {
        this.spinner.hide();
      }, 300);
      ventas.forEach(venta => { 
          this.devolucion += parseInt(venta.Devolucion.toString().split('.').join(''))
          this.tradicional += parseInt(venta.Tradicional.toString().split('.').join(''))
          this.mega += parseInt(venta.Mega.toString().split('.').join(''))
      })

      Swal.fire({
        title: 'Guardado Exitosamente !',
        html:
        "<ul>"+
        ` <li>Tradicional : ${formatNumber(this.tradicional, this.locale, '1.0-0')}</li>`+
        ` <li>Mega : ${formatNumber(this.mega, this.locale, '1.0-0')} </li>` +
        ` <li>Devolucion : ${formatNumber(this.devolucion, this.locale, '1.0-0')}</li>`+
        ` <li>TOTAL : ${formatNumber((this.tradicional + this.mega - this.devolucion), this.locale, '1.0-0') }</li>`+
        `</ul>`,
        // 'You can use <b>bold text</b>, ' +
        // '<a href="//sweetalert2.github.io">links</a> ' +
        // 'and other HTML tags',
      })
    })
    // console.log(ventas);
  }

  

  get tiendas() {
    return this.form.get("tiendas") as FormArray;
  }

}
