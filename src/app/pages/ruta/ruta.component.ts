import { FormRutaComponent } from './form-ruta/form-ruta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ruta } from './../../_model/ruta.interface';
import { FormControl } from '@angular/forms';
import { RutaService } from './../../_service/ruta.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})

export class RutaComponent implements OnInit {

  rutas: Ruta[];

  page: any = 1;
  pageSize: any = 4;
  collectionSize: any = 5
  countries: Ruta[];

  countries$: Observable<Ruta[]>;
  rutas$: Observable<Ruta[]>;
  filter: FormControl = new FormControl('');

  constructor(
    private _rutaService: RutaService,
    private _modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {
    this.refreshCountries()
    this.getRutas();
    this._rutaService.getChangeList().subscribe(() => this.getRutas())
  }

  openModal(ruta?: Ruta) {
    let modal = this._modalService.open(FormRutaComponent)
    modal.componentInstance.ruta = ruta;
    //modal.result.then((res) => {})
  }

  eliminar(id: string) {
     this._rutaService.deleteItem(id).subscribe(res => {console.log(res);
    })
  }

  getRutas() {
    this._rutaService.getItems().subscribe(data => {
      this.rutas = data.data;
      this.tableFilter();
    });
  }

  tableFilter() {
    this.rutas$ = this.filter.valueChanges.pipe(
      startWith(''),
      //debounceTime(300),
      map(text => this.search(text))
    );
  }

  search(text: string): Ruta[] {
    return this.rutas.filter(val => {
      const term = text.toLowerCase();
      return []
      // return val.Nombre.toLowerCase().includes(term) ||
      // val.Cedula.toString().toLowerCase().includes(term) ||
      // val.Telefono.toString().toLowerCase().includes(term)
    });
  }

  refreshCountries() {
    // this.collectionSize = this.rutas.length;
    // this.countries = this.rutas
    //   .map((country, i) => ({id: i + 1, ...country}))
    //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
