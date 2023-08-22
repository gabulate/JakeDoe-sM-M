import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { EvaluacionCreateComponent } from 'src/app/evaluacion/evaluacion-create/evaluacion-create.component';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-compra-by-cliente',
  templateUrl: './compra-by-cliente.component.html',
  styleUrls: ['./compra-by-cliente.component.css'],
})
export class CompraByClienteComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  clienteId : any;
  currentUser: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['orden', 'fecha','total' ,'acciones'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private noti: NotificacionService,
  ) {}

  ngAfterViewInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.listaPedidos(Number(id));
    
  }
  listaPedidos(id:any) {
    //localhost:3000/videojuego
    this.gService
      .get('compra/cliente', id)
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
    this.router.navigate(['/compra', id], {
      relativeTo: this.route,
    });
  }
  evaluacion(idOrden: number) {
    this.evaluacionByOrdenId(idOrden).subscribe(evaluacionVacia => {
      console.log("hasEvaluacion", evaluacionVacia);
      if (evaluacionVacia) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.data = {
          idOrden: idOrden
        };
        this.dialog.open(EvaluacionCreateComponent, dialogConfig);
      } else {
        this.noti.mensaje(
          'Evaluación ya registrada',
          'Ya hay una evaluación registrada para esta orden, por favor evalúe otra orden',
          TipoMessage.error
        );
      }
    },
    error => {
      // Manejar errores en la suscripción, si es necesario
      console.error('Error al obtener evaluación: ', error);
    });
    
  }
  
  evaluacionByOrdenId(ordenId: number) {
    return this.gService.get('evaluacion/orden', ordenId).pipe(
      takeUntil(this.destroy$),
      map((data: any) => {
        console.log("data",data);
        return data.length === 0;
      })
    );
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
