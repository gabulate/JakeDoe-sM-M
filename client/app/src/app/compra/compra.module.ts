import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './compra-routing.module';
import { CompraByClienteComponent } from './compra-by-cliente/compra-by-cliente.component';
import { PedidoByVendedorComponent } from './pedido-by-vendedor/pedido-by-vendedor.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { CompraDetalleComponent } from './compra-detalle/compra-detalle.component';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { PedidoDiagComponent } from './pedido-diag/pedido-diag.component';
import { OrdenAllComponent } from './orden-all/orden-all.component';
import { OrdenDiagComponent } from './orden-diag/orden-diag.component';
import { PedidoEditComponent } from './pedido-edit/pedido-edit.component';

@NgModule({
  declarations: [
    CompraByClienteComponent, 
    CompraDetalleComponent, 
    PedidoByVendedorComponent, 
    PedidoDetalleComponent, 
    PedidoDiagComponent, 
    OrdenAllComponent, OrdenDiagComponent, PedidoEditComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class PedidoModule {}
