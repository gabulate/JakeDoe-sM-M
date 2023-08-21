import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserAllActivosComponent } from './user-all-activos/user-all-activos.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { UserAllDeshabilitadosComponent } from './user-all-deshabilitados/user-all-deshabilitados.component';
import { UserCreateDireccionComponent } from './user-create-direccion/user-create-direccion.component';
import { UserCreatePagoComponent } from './user-create-pago/user-create-pago.component';
import { UserCuentaComponent } from './user-cuenta/user-cuenta.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: UserIndexComponent,
    children: [
      { path: 'login', component: UserLoginComponent },
    ],
  },
  {path: 'usuario/registrar',component: UserCreateComponent},
  //{path: 'usuario/direccionpago/:id',component: UserCreateDireccionPagoComponent},

  {path: 'direccion/usuario/:id',component: UserCreateDireccionComponent},
  {path: 'metodopago/usuario/:id',component: UserCreatePagoComponent},
  {path: 'usuario/cuenta', component:UserCuentaComponent},

  
    {
      path: 'usuario/activos', component:UserAllActivosComponent, canActivate: [AuthGuard],
      data: {roles: [1],},
    },
    {
      path: 'usuario/deshabilitados', component: UserAllDeshabilitadosComponent, canActivate: [AuthGuard],
      data: {roles: [1],},
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
