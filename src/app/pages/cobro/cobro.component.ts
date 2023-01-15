import { startWith, map, debounceTime } from 'rxjs/operators';
import { FormCobroComponent } from './form-cobro/form-cobro.component';
import { Observable } from 'rxjs';
import { RutaComponent } from './../ruta/ruta.component';
import { Cobro } from './../../_model/cobro.interface';
import { RutaService } from './../../_service/ruta.service';
import { CobroService } from './../../_service/cobro.service';
import { Component, OnInit } from '@angular/core';
import { Ruta } from 'src/app/_model/ruta.interface';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.css']
})
export class CobroComponent implements OnInit {

  id: string | null;

  cobros: Cobro[];
  cobro: Cobro;
  form: FormGroup;
  cobros$: Observable<Cobro[]>;
  filter: FormControl = new FormControl("");

  constructor(
    private _cobroService: CobroService,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private spinner : NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin') == null){
      this.getParamId();
      this.getCobrosById(this.id)
    }else{
      this.getCobros()
    }
  }
  
  getParamId(){
    this.id = localStorage.getItem("idRuta")
    this.getCobrosById(this.id);
  }
  
  openModal(cobro?: Cobro) {
    let modal = this._modalService.open(FormCobroComponent)
    modal.componentInstance.cobro = cobro

    modal.result.then((result) => {
      localStorage.getItem('admin') == null ?
        this.getCobrosById(this.id) :
        this.getCobros()
    })
  }

  eliminar(id: string) {
    this._cobroService.deleteItem(id).subscribe(data => {
      this.getCobros()
    })
  }

  getCobrosById(id: string | null) {
    this.spinner.show();
    this._cobroService.getCobroByRutaId(id).subscribe(data => {
      this.cobros = data.data
      this.spinner.hide();
      this.tableFilter();
    });
  }

  getCobros() {
    this.spinner.show();
    this._cobroService.getItems().subscribe(data => {
      this.cobros = data.data
      this.spinner.hide();
      this.tableFilter();
    });
  }

  tableFilter() {
    this.cobros$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    )
  }

  search(text: string): Cobro[] {
    return this.cobros.filter(val => {
      const term = text.toLowerCase();
      return val.Tienda.Nombre?.toLowerCase().includes(term) ||
      val.Tienda.Ruta.Empleado?.Nombre.toLowerCase().includes(term) ||
      val.Valor.toString().includes(term) 
    });
  }


}
