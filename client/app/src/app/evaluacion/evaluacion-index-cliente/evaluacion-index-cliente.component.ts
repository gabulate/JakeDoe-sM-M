import {AfterViewInit,Component,Inject,OnInit,ViewChild,} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EvaluacionCreateClienteComponent } from 'src/app/evaluacion/evaluacion-create-cliente/evaluacion-create-cliente.component';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-evaluacion-index-cliente',
  templateUrl: './evaluacion-index-cliente.component.html',
  styleUrls: ['./evaluacion-index-cliente.component.css']
})
export class EvaluacionIndexClienteComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  orden:any;
  uniqueClienteInfo:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['orden', 'cliente', 'acciones'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog:MatDialog,
    private noti: NotificacionService,
  ) {
  }

  ngAfterViewInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.listaPedidos(Number(id));
  }
  listaPedidos(id:any) {
    this.gService
      .get('compra/vendedor', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log("lista de pedidos ->", this.datos);

        const ordenesMap = {}; // Objeto para agrupar las órdenes por ID de orden
        const addedOrderIds = new Set(); // Conjunto para rastrear los IDs de órdenes agregados
  
        this.datos.forEach((detalle: any) => {
          const ordenId = detalle.compra.id;
          const clienteId = detalle.compra.cliente.id;
  
          if (!addedOrderIds.has(ordenId)) {
            if (!ordenesMap[ordenId]) {
              ordenesMap[ordenId] = {
                idOrden: ordenId,
                idCliente: clienteId,
                nombreCliente: detalle.compra.cliente.Nombre,
                apellidoCliente: detalle.compra.cliente.Apellido,
              };
            }
            
            addedOrderIds.add(ordenId); // Agregar el ID de la orden al conjunto
          }
        });
  
        this.uniqueClienteInfo = Object.values(ordenesMap); // Convertir el objeto en un array
        console.log('ClienteInfo: ', this.uniqueClienteInfo);
  
        
        this.dataSource = new MatTableDataSource(this.uniqueClienteInfo);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }


  evaluacion(ordenId:number){
    let clienteId=0;

    const orden = this.datos.find((ordenItem: any) => ordenItem.compra.id === ordenId);
    if (orden && orden.compra.cliente) {
      clienteId= orden.compra.cliente.id;
    }
    
    this.evaluacionByOrdenId(ordenId, clienteId).subscribe(
      (evaluacionVacia)=>{
        
        if (evaluacionVacia){
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = false;
          dialogConfig.data = {
            idOrden:ordenId,
          };
          this.dialog.open(EvaluacionCreateClienteComponent, dialogConfig); 
        } else {
          this.noti.mensaje(
            'Evaluación ya registrada para este cliente',
            'Ya hay una evaluación registrada para esta orden y cliente',
            TipoMessage.error
          );
        }
      },
      (error) => {
        console.error('Error al obtener evaluación: ', error);
      }
    );
  }

  evaluacionByOrdenId(ordenId: number, clienteId:number) {
    
    const endpoint = `evaluacion/orden/${ordenId}/evaluado/${clienteId}`;
    return this.gService.getByUrl(endpoint).pipe(
      takeUntil(this.destroy$),
      map((data: any) => {
        console.log('data', data);
        return data.length === 0;
      })
    );
  }

  ngOnDestroy() {
      
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
}
