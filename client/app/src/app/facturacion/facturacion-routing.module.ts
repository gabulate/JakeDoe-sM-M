import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';

const routes: Routes = [
  { path: 'facturacion/carrito', component: CarritoComponent },
  { path: 'facturacion/confirmar', component: ConfirmarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacionRoutingModule { }
