import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedido-diag',
  templateUrl: './pedido-diag.component.html',
  styleUrls: ['./pedido-diag.component.css']
})
export class PedidoDiagComponent implements OnInit{
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<PedidoDiagComponent>,
    private gService:GenericService
  ) { 
    this.datosDialog=data; //recibe los datos q le mandan
   
  }
  
  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerPedido(this.datosDialog.id);
    }
  }
  obtenerPedido(id: any) {
    this.gService
    .get('compra/pedido',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
    });
  }

  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }
}
