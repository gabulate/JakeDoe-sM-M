import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VendedorDashboardComponent } from './vendedor-dashboard/vendedor-dashboard.component';

const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },
  {
    path: 'vendedor/dashboard',
    component: VendedorDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [3] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
