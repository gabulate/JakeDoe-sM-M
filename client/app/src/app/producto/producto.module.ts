import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from '@coreui/angular';


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
import { MatDialogModule } from '@angular/material/dialog';
import { ProductoDiagComponent } from './producto-diag/producto-diag.component';
import { ProductoAllByVendedorComponent } from './producto-all-by-vendedor/producto-all-by-vendedor.component';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatError } from '@angular/material/form-field';
import { ProductoAdminComponent } from './producto-admin/producto-admin.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';


@NgModule({
  declarations: [
    ProductoIndexComponent,
    ProductoAllComponent,   
    ProductoDetailComponent,
    ProductoDiagComponent,
    ProductoAllByVendedorComponent,
    ProductoAdminComponent,
    ProductoEditComponent
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
    MatButtonModule,
    MatDialogModule,
    CarouselModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ProductoModule { }
