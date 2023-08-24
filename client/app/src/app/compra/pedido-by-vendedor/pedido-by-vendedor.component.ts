import {AfterViewInit,Component,Inject,OnInit,ViewChild,} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PedidoDiagComponent } from '../pedido-diag/pedido-diag.component';
import { PedidoEditComponent } from '../pedido-edit/pedido-edit.component';

@Component({
  selector: 'app-pedido-by-vendedor',
  templateUrl: './pedido-by-vendedor.component.html',
  styleUrls: ['./pedido-by-vendedor.component.css'],
})
export class PedidoByVendedorComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['orden', 'producto', 'cantidad', 'total' ,'acciones'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog:MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.listaPedidos(Number(id));
  }
  listaPedidos(id:any) {
    //localhost:3000/videojuego
    this.gService
      .get('compra/vendedor', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  detalle(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
  //"abra el elemento q se va a convertir en el dialogo"  
  this.dialog.open(PedidoDiagComponent, dialogConfig); 
  }
  actualizarPedido(detalleId:number,compraId:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      detalleId:detalleId,
      compraId:compraId,
    };
    this.dialog.open(PedidoEditComponent, dialogConfig); 
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
