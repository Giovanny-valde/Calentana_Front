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

@Component({
  selector: 'app-reporte-venta',
  templateUrl: './reporte-venta.component.html',
  styleUrls: ['./reporte-venta.component.css']
})
export class ReporteVentaComponent implements OnInit {

  id: string | null;
  ventas: Venta[];
  rutas : Ruta[]
  form: FormGroup;
  ventas$: Observable<Venta[]>;
  filter: FormControl = new FormControl("");

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
      this.spinner.hide();
      this.tableFilter();
    })
  }

  tableFilter() {
    this.ventas$ = this.filter.valueChanges.pipe(
      startWith(''),
      //debounceTime(300),
      map(text => this.search(text))
    )
  }

  searchFechas(){
    if (this.form.invalid) {
      return
    }
    if(this.form.controls['Ruta'].value == null) {this.form.controls['Ruta'].value == ""}
    console.log(this.form.value );
    if(this.form.controls['Acumular'].value == "True"){
      this._ventaService.ventasTotalesByfecha(this.form.value).subscribe(data => {
        this.ventas = data.data
        this.tableFilter();
      })
    }else{
      this._ventaService.ventasByfecha(this.form.value).subscribe(data => {
          this.ventas = data.data
          this.tableFilter();
      })
    }
  }
  
  search(text: string): Venta[] {
    return this.ventas.filter(val => {
      const term = text.toLowerCase();
      return val.Tradicional.toString().toLowerCase().includes(term) ||
      val.Devolucion.toString().toLowerCase().includes(term) ||
      val.Fecha.toString().toLowerCase().includes(term) ||
      val.Mega.toString().toLowerCase().includes(term) ||
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
      link.setAttribute('download', `Ventas-${FechaFinal}-${FechaInicial}.xlsx`);
      link.click();
    }) 
  }



}
