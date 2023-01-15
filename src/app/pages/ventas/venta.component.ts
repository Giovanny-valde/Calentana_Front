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
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

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
      this.spinner.hide()
      ventas.forEach(venta => { 
          this.devolucion += parseInt(venta.Devolucion.toString().split('.').join(''))
          this.tradicional += parseInt(venta.Tradicional.toString().split('.').join(''))
          this.mega += parseInt(venta.Mega.toString().split('.').join(''))
      })

      this.devolucion = this.devolucion ? this.devolucion : 0
      this.tradicional = this.tradicional ? this.tradicional : 0
      this.mega = this.mega ? this.mega : 0

      Swal.fire({
        title: 'Guardado Exitosamente !',
        html:
        "<ul>"+
        ` <li>Tradicional : ${this.tradicional}</li>`+
        ` <li>Mega : ${this.mega} </li>` +
        ` <li>Devolucion : ${this.devolucion}</li>`+
        ` <li>TOTAL : ${this.tradicional + this.mega - this.devolucion }</li>`+
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
