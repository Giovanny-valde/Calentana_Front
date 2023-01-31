import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VentaService } from './../../_service/venta.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Venta } from 'src/app/_model/venta.interface';
import { Ruta } from 'src/app/_model/ruta.interface';
import { RutaService } from 'src/app/_service/ruta.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Target } from '@angular/compiler';

@Component({
  selector: 'app-reporte-venta',
  templateUrl: './reporte-venta.component.html',
  styleUrls: ['./reporte-venta.component.css']
})
export class ReporteVentaComponent implements OnInit {

  tradicional = 0
  mega = 0
  devolucion = 0

  id: string | null;
  ventas: Venta[] = [];
  ventasPag: Venta[] = [];
  rutas : Ruta[]
  form: FormGroup;
  ventas$: Observable<Venta[]>;
  filter: FormControl = new FormControl("");
  Math : Math
  
  page = 1;
	pageSize = 10;
	collectionSize = this.ventas.length;

  constructor(
    private _ventaService: VentaService,
    private _rutaService: RutaService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private spinner : NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getVentas()
  }

  initForm() {
   
    this._rutaService.getItems().subscribe(data => {
      this.rutas = data.data
    })
    this.form = this._formBuilder.group({
      FechaInicial:  [null, [Validators.required]],
      FechaFinal: [null, [Validators.required]],
      Ruta:  [''],
      Acumular: ['False']
    })
  }

  getVentas(){
    this.spinner.show();
    this._ventaService.getItems().subscribe(data => {
    this.ventas = data.data
    this.refreshCountries(this.page)
    this.spinner.hide();
    this.tableFilter();
    })
  }

  tableFilter() {
    this.obtenerTotal()
    this.ventas$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    )
  }

  obtenerTotal(){
      this.tradicional = 0
      this.mega = 0
      this.devolucion = 0
      this.ventas.forEach(element => {
          this.tradicional += element.Tradicional
          this.mega += element.Mega
          this.devolucion += element.Devolucion
      })
  }

  searchFechas(){
    if (this.form.invalid) {
        if (this.form.controls["Ruta"].value == null && this.form.controls['Ruta'].value == "") {
          return     
        } 
    }
    if(this.form.controls['Ruta'].value == null) {this.form.controls['Ruta'].value == ""}
      this.page = 1
      this.spinner.show();
    if(this.form.controls['Acumular'].value == "True"){
      this._ventaService.ventasTotalesByfecha(this.form.value).subscribe(data => {
        this.ventas = data.data
        this.spinner.hide();
        this.refreshCountries(this.page)
        this.tableFilter();
      })
    }else{
      this._ventaService.ventasByfecha(this.form.value).subscribe(data => {
          this.ventas = data.data
          this.spinner.hide();
          this.refreshCountries(this.page)
          this.tableFilter();
      })
    }
  }
  
  search(text: string): Venta[] {
    this.collectionSize = this.ventas.length;

    return this.ventasPag.filter(val => {
      const term = text.toLowerCase();
      return val.Tradicional?.toString().toLowerCase().includes(term) ||
      val.Devolucion?.toString().toLowerCase().includes(term) ||
      val.Fecha.toString().toLowerCase().includes(term) ||
      val.Mega?.toString().toLowerCase().includes(term) ||
      val.Ruta.Empleado.Nombre.toLowerCase().includes(term) ||
      val.Tienda.Nombre.toLowerCase().includes(term) ||
      val.Total.toString().toLowerCase().includes(term)
    });
  }

  downloadExcel(){
    if (this.form.invalid) {
      return
    }
    this._ventaService.reporteExcel(this.form.value).subscribe((data: any) => {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      let FechaInicial = this.datePipe.transform(this.form.controls["FechaInicial"].value, 'yyyy-MM-dd')
      let FechaFinal = this.datePipe.transform(this.form.controls["FechaFinal"].value, 'yyyy-MM-dd')
      link.setAttribute('download', `Ventas:${FechaInicial}/${FechaFinal}.xlsx`);
      link.click();
    }) 
  }

  refreshCountries(page : number ) {
    let paginas = Math.round(this.ventas.length / this.pageSize)
    if( page > 0  && page <= paginas) {
      this.page = page;
      this.ventasPag = this.ventas.map((venta) => ( venta )).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
      );
      this.tableFilter() 
    }
	}
  


}
