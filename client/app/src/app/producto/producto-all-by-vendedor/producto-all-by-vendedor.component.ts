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

@Component({
  selector: 'app-producto-all-by-vendedor',
  templateUrl: './producto-all-by-vendedor.component.html',
  styleUrls: ['./producto-all-by-vendedor.component.css']
})
export class ProductoAllByVendedorComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['producto', 'categoria-estado', 'cantidad','precio' ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {}

  ngAfterViewInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.listaProductos(Number(id));
  }
  listaProductos(id:any) {
    //localhost:3000/videojuego
    this.gService
      .get('producto/vendedor', id)
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
    this.router.navigate(['/producto', id], {
      relativeTo: this.route,
    });
  }

  mensajes(id:number){
    this.router.navigate(['/mensaje/producto', id], {
      relativeTo: this.route,
    });
  }


  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
