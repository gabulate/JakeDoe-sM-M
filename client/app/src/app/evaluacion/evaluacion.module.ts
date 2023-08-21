import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { EvaluacionCreateComponent } from './evaluacion-create/evaluacion-create.component';


@NgModule({
  declarations: [
    EvaluacionCreateComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    EvaluacionRoutingModule
  ]
})
export class EvaluacionModule { }
