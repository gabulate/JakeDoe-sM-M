import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'; 
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { CarritoComponent } from './carrito/carrito.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';


@NgModule({
  declarations: [
    CarritoComponent,
    ConfirmarComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule, ReactiveFormsModule,
    FacturacionRoutingModule
  ]
})
export class FacturacionModule { }
