import { EmpleadoComponent } from './empleado/empleado.component';
import { VentaComponent } from './ventas/venta.component';
import { RutaComponent } from './ruta/ruta.component';
import { TiendaComponent } from './tienda/tienda.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';
import { CobroComponent } from './cobro/cobro.component';

const routes: Routes = [
  {
    path: "dashBoard",
    component: DashBoardComponent,
  },
  {
    path: "tienda",
    component: TiendaComponent,
  },
  {
    path: "ruta",
    component: RutaComponent,
  },
  {
    path: "empleado",
    component: EmpleadoComponent,
  },
  {
    path: "venta",
    component: VentaComponent,
  },
  {
    path: "reporte-ventas",
    component: ReporteVentaComponent, 
  },
  {
    path: "cobro",
    component: CobroComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
