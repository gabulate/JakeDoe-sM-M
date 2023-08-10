import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoAllByVendedorComponent } from '../producto/producto-all-by-vendedor/producto-all-by-vendedor.component';
import { MensajeIndexComponent } from './mensaje-index/mensaje-index.component';
import { MensajeAllByProductoComponent } from './mensaje-all-by-producto/mensaje-all-by-producto.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { MensajeIndexAdminComponent } from './mensaje-index-admin/mensaje-index-admin.component';

const routes: Routes = [
 
//{path: 'mensaje/producto/:id', component:MensajeAllByProductoComponent},
 // {path:'mensaje/producto/vendedor/:id', component: MensajeIndexComponent},
  //{path: 'mensaje/producto/vendedor/:id', component:MensajeIndexComponent},
  {
    path: 'mensaje/all',
    canActivate: [AuthGuard],
    data: {
      roles: [1],
    },
    component: MensajeIndexAdminComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensajeRoutingModule { }
