import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoAllByVendedorComponent } from './producto-all-by-vendedor/producto-all-by-vendedor.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';

const routes: Routes = [
  {path:'producto', component:ProductoIndexComponent},
  {path:'producto/:id', component:ProductoDetailComponent},
  {path: 'producto/vendedor/:id', component:ProductoAllByVendedorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
