import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserIndexComponent } from './user-index/user-index.component';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule} from '@angular/material/tabs';
import { UserAllActivosComponent } from './user-all-activos/user-all-activos.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserAllDeshabilitadosComponent } from './user-all-deshabilitados/user-all-deshabilitados.component';
import { UserCreateDiagComponent } from './user-create-diag/user-create-diag.component';
import { UserCreatePagoComponent } from './user-create-pago/user-create-pago.component';
import { UserCreateDireccionComponent } from './user-create-direccion/user-create-direccion.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UserCuentaComponent } from './user-cuenta/user-cuenta.component';

@NgModule({
  declarations: [
    UserCreateComponent, 
    UserLoginComponent, 
    UserIndexComponent, 
    UserAllActivosComponent, 
    UserAllDeshabilitadosComponent,
    UserCreateDiagComponent,
    UserCreatePagoComponent, 
    UserCreateDireccionComponent, UserCuentaComponent, 
    
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatGridListModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    UserRoutingModule
  ]
})
export class UserModule { }
