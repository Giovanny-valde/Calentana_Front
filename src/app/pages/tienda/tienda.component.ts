import { startWith, map, debounceTime } from 'rxjs/operators';
import { FormTiendaComponent } from './form-tienda/form-tienda.component';
import { Observable } from 'rxjs';
import { RutaComponent } from './../ruta/ruta.component';
import { Tienda } from './../../_model/tienda.interface';
import { RutaService } from './../../_service/ruta.service';
import { TiendaService } from './../../_service/tienda.service';
import { Component, OnInit } from '@angular/core';
import { Ruta } from 'src/app/_model/ruta.interface';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  id: string | null;

  tiendas: Tienda[];
  tienda: Tienda;
  form: FormGroup;
  tiendas$: Observable<Tienda[]>;
  filter: FormControl = new FormControl("");

  constructor(
    private _tiendaService: TiendaService,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    //this.initForm();
    this.getParamId();
    this._tiendaService.getChangeList().subscribe(() => this.getTiendas(this.id))
  }

  initForm() {
    this.form = this._formBuilder.group({
      Id: [null],
      Nombre: [null, [Validators.required]],
      Dueño: null,
      Nit: null,
      Telefono: null,
      Direccion: null,
      Ruta: [null, [Validators.required]]
    })
  }

  getParamId(){
    this.id = localStorage.getItem("idRuta")
    this.getTiendas(this.id);
  }


  openModal(tienda?: Tienda) {
    let modal = this._modalService.open(FormTiendaComponent)
    modal.componentInstance.tienda = tienda
  }

  eliminar(id: string) {
    this._tiendaService.deleteItem(id).subscribe(data => {console.log(data);
    })
  }

  operar() {
    let tienda: Tienda = {
      Id: "",
      Nombre: this.form.value["Nombre"],
      Dueno: this.form.get("Dueno")?.value,
      Nit: this.form.value["Nit"],
      Telefono: this.form.value["Telefono"],
      Direccion: this.form.value["Direccion"],
      Ruta: this.form.value["Ruta"]
    }
      console.log(tienda);
      this._tiendaService.saveItem(tienda).subscribe(data => {console.log(data);
      })
  }

  getTiendas(id: string | null) {
    this._tiendaService.getTiendaByRuta(id).subscribe(data => {
      this.tiendas = data.data
      console.log(this.tiendas);
      this.tableFilter();
    });
  }

  tableFilter() {
    this.tiendas$ = this.filter.valueChanges.pipe(
      startWith(''),
      //debounceTime(300),
      map(text => this.search(text))
    )
  }

  search(text: string): Tienda[] {
    return this.tiendas.filter(val => {
      const term = text.toLowerCase();
      return val.Nombre.toLowerCase().includes(term) ||
      val.Dueno.toLowerCase().includes(term) ||
      val.Nit.toLowerCase().includes(term) ||
      val.Telefono.toLowerCase().includes(term) ||
      val.Direccion.toLowerCase().includes(term) ||
      val.Ruta.Nombre.toLowerCase().includes(term)
    });
  }


}
