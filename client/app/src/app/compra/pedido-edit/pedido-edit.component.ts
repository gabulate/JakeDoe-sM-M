import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { PedidoByVendedorComponent } from '../pedido-by-vendedor/pedido-by-vendedor.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NotificacionService,TipoMessage} from 'src/app/share/notification.service';


@Component({
  selector: 'app-pedido-edit',
  templateUrl: './pedido-edit.component.html',
  styleUrls: ['./pedido-edit.component.css']
})
export class PedidoEditComponent implements OnInit {
  submitted = false;
  datos: any;
  datosDialog: any;
  pedidoForm: FormGroup;
  pedidoInfo: any;
  EstadoPedidoList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<PedidoByVendedorComponent>,
    private dialogRef1: MatDialogRef<PedidoEditComponent>,
    private gService: GenericService,
    private fb: FormBuilder,
    private noti: NotificacionService,
  ) {
    this.datosDialog = data; //recibe los datos q le mandan
    this.formularioReactive();
    this.listaPedidos();
  }
  ngOnInit(): void {
    this.gService
      .get('compra/detalle', this.datosDialog.detalleId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.pedidoInfo = data;
        console.log('compraDetalle por act--> ', this.pedidoInfo);
        this.pedidoForm.setValue({
          id: this.pedidoInfo.id,
          compraId: this.pedidoInfo.compra.id,
          estadoPedido: this.pedidoInfo.estadoCompra.id,
        });
      });
  }

  formularioReactive() {
    this.pedidoForm = this.fb.group({
      id: [null, null],
      compraId: [null, null],
      estadoPedido: [null, Validators.required],
    });
  }
  listaPedidos() {
    this.EstadoPedidoList = null;
    this.gService
      .list('estadoCompra')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('EstadoPedidoList ', data);
        this.EstadoPedidoList = data;
      });
  }

  actualizarCompraDetallePedido() {
    this.submitted = true;
    this.pedidoForm.patchValue({ detalleId: this.datosDialog.detalleId });
    this.pedidoForm.patchValue({ compraId: this.datosDialog.compraId });
    console.log('pedidoForm --> ', this.pedidoForm.value);

    if (this.pedidoForm.invalid) return;

    this.gService
      .update('compra/detalle', this.pedidoForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log("pedido en compraDetalle actualizado ", data);
        this.noti.mensaje(
          'Pedido actualizado',
          'Se ha actualizado el estado de su pedido exitosamente' , TipoMessage.success
        );
        this.dialogRef1.close({ updated: true }); // Emit the signal

        this.close();
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.pedidoForm.controls[control].hasError(error);
  };
  close() {
    this.dialogRef.close();
  }
}

