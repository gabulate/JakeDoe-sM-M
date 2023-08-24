import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrdenAllComponent } from '../orden-all/orden-all.component';

@Component({
  selector: 'app-orden-diag',
  templateUrl: './orden-diag.component.html',
  styleUrls: ['./orden-diag.component.css']
})
export class OrdenDiagComponent implements AfterViewInit{
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosDialog:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['producto', 'categoriaProducto','estadoProducto','cantidad', 'precio','estado', ];

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<OrdenAllComponent>,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    this.datosDialog=data;
  }

  ngAfterViewInit(): void {
    if(this.datosDialog.id){
      console.log(this.datosDialog.id);
      this.getCompra(Number(this.datosDialog.id));
    }
  }
  getCompra(id:any) {
    //localhost:3000/compra
    this.gService
      .get('compra/', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log("prueba", data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos.CompraDetalle);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
