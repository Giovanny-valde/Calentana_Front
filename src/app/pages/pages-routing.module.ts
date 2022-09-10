import { EmpleadoComponent } from './empleado/empleado.component';
import { VentaComponent } from './ventas/venta.component';
import { RutaComponent } from './ruta/ruta.component';
import { TiendaComponent } from './tienda/tienda.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: "venta",
    component: VentaComponent,
  },
  {
    path: "empleado",
    component: EmpleadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
