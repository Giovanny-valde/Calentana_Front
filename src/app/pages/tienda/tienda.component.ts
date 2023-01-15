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
import { NgxSpinnerService } from 'ngx-spinner';



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
    private spinner : NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin') == null){
      this.getParamId();
      this._tiendaService.getChangeList().subscribe(() => this.getTiendasById(this.id))
    }else{
      this.getTiendas()
      this._tiendaService.getChangeList().subscribe(() => this.getTiendas())
    }
  }
  
  getParamId(){
    this.id = localStorage.getItem("idRuta")
    this.getTiendasById(this.id);
  }

  openModal(tienda?: Tienda) {
    let modal = this._modalService.open(FormTiendaComponent)
    modal.componentInstance.tienda = tienda
  }

  eliminar(id: string) {
    this._tiendaService.deleteItem(id).subscribe(data => {console.log(data);
    })
  }

  getTiendasById(id: string | null) {
    this.spinner.show();
    this._tiendaService.getTiendaByRuta(id).subscribe(data => {
      this.tiendas = data.data
      this.spinner.hide();
      this.tableFilter();
    });
  }

  getTiendas() {
    this.spinner.show();
    this._tiendaService.getItems().subscribe(data => {
      this.tiendas = data.data
      this.spinner.hide();
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
      val.Nit?.toString().toLowerCase().includes(term) ||
      val.Telefono?.toString().toLowerCase().includes(term) ||
      val.Direccion?.toLowerCase().includes(term) ||
      val.Barrio?.toLowerCase().includes(term) ||
      val.Ruta.Nombre.toLowerCase().includes(term)
    });
  }


}
