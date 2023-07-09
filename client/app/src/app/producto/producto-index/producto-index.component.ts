import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {  Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ProductoDiagComponent } from '../producto-diag/producto-diag.component';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  
  constructor(private gService: GenericService,
    private dialog: MatDialog){
    this.listarProductos();
  }
  listarProductos(){
    this.gService.list('producto/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.datos=data
    });
  }

  detalleProducto(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    };
    //"abra el elemento q se va a convertir en el dialogo"
    this.dialog.open(ProductoDiagComponent,dialogConfig); 
  }
}
