import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BootstrapModule } from './../bootstrap/bootstrap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { VentaComponent } from './ventas/venta.component';
import { TiendaComponent } from './tienda/tienda.component';
import { RutaComponent } from './ruta/ruta.component';
import { FormRutaComponent } from './ruta/form-ruta/form-ruta.component';
import { FormTiendaComponent } from './tienda/form-tienda/form-tienda.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { FormEmpleadoComponent } from './empleado/form-empleado/form-empleado.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    VentaComponent,
    TiendaComponent,
    RutaComponent,
    FormRutaComponent,
    FormTiendaComponent,
    EmpleadoComponent,
    FormEmpleadoComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    BootstrapModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PagesModule { }
