import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatCardModule } from '@angular/material/card'; 
import { MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 


@NgModule({
  declarations: [
    ProductoIndexComponent,
    ProductoAllComponent,
    ProductoDetailComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatGridListModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProductoModule { }
