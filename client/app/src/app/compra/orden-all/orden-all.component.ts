import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrdenDiagComponent } from '../orden-diag/orden-diag.component';

@Component({
  selector: 'app-orden-all',
  templateUrl: './orden-all.component.html',
  styleUrls: ['./orden-all.component.css']
})
export class OrdenAllComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['orden', 'cliente', 'total' ,'acciones'];
 // displayedColumns = ['orden', 'cliente', 'total' ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog:MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.listaOrdenes();
  }
  listaOrdenes() {
    //localhost:3000/videojuego
    this.gService
      .list('compra/')
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
  this.dialog.open(OrdenDiagComponent, dialogConfig); 

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
