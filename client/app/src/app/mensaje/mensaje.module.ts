import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensajeRoutingModule } from './mensaje-routing.module';
import { MensajeAllByProductoComponent } from './mensaje-all-by-producto/mensaje-all-by-producto.component';
import { MensajeIndexComponent } from './mensaje-index/mensaje-index.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    MensajeAllByProductoComponent,
    MensajeIndexComponent
  ],
  imports: [
    CommonModule,
    MensajeRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule, 
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class MensajeModule { }
