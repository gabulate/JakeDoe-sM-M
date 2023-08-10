import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompraByClienteComponent } from './compra-by-cliente/compra-by-cliente.component';
import { PedidoByVendedorComponent } from './pedido-by-vendedor/pedido-by-vendedor.component';
import { CompraDetalleComponent } from './compra-detalle/compra-detalle.component';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { OrdenAllComponent } from './orden-all/orden-all.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  { path: 'compra/cliente/:id', component: CompraByClienteComponent },
  { path: 'pedido/vendedor/:id', component: PedidoByVendedorComponent },
  { path: 'pedido/:id', component: PedidoDetalleComponent },
  { path: 'compra/:id', component: CompraDetalleComponent },
 
  {
    path: 'orden', component: OrdenAllComponent , canActivate: [AuthGuard],
    data: {roles: [1],},
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoRoutingModule {}
