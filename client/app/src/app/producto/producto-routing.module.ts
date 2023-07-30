import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoAllByVendedorComponent } from './producto-all-by-vendedor/producto-all-by-vendedor.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { MensajeAllByProductoComponent } from '../mensaje/mensaje-all-by-producto/mensaje-all-by-producto.component';
import { MensajeIndexComponent } from '../mensaje/mensaje-index/mensaje-index.component';

const routes: Routes = [
  {path:'producto', component:ProductoIndexComponent},
  {path:'producto/:id', component:ProductoDetailComponent},
  {path: 'producto/vendedor/:id', component:ProductoAllByVendedorComponent},
  {path: 'mensaje/producto/:id', component:MensajeAllByProductoComponent},
  {path: 'mensaje/producto/vendedor/:id', component:MensajeIndexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
