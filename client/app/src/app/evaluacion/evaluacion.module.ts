import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { EvaluacionCreateComponent } from './evaluacion-create/evaluacion-create.component';
import { EvaluacionCreateVendedorComponent } from './evaluacion-create-vendedor/evaluacion-create-vendedor.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EvaluacionCreateComponent,
    EvaluacionCreateVendedorComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    EvaluacionRoutingModule
  ]
})
export class EvaluacionModule { }
