import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-user-all-deshabilitados',
  templateUrl: './user-all-deshabilitados.component.html',
  styleUrls: ['./user-all-deshabilitados.component.css']
})
export class UserAllDeshabilitadosComponent implements AfterViewInit{
  uOriginal: any;
  uActualizado:any;

  datosUsuariosActivos:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['nombre','roles', 'acciones'];
  //displayedColumns = ['foto','nombre','roles','acciones'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private sanitizer: DomSanitizer,
    private authService:AuthenticationService
  ) {}

  ngAfterViewInit(): void {
    this.listarUsuarios();
  }
  listarUsuarios(){
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datosUsuariosActivos = data.filter
        ((usuario:any)=> usuario.Deshabilitado);
        this.dataSource = new MatTableDataSource<any>(this.datosUsuariosActivos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  obtenerUsuario(id:number){
    this.gService
      .get('usuario', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.uOriginal = data;
        console.log("ajá aquí el usuario con datos originales", this.uOriginal);
        this.actualizarUsuario(this.uOriginal);
      });
  }

actualizarUsuario(usuario:any){
  this.gService.update('usuario/activacion', usuario)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any)=>{
    this.uActualizado=data;
    console.log("Diocito por favor! ", this.uActualizado);
    this.listarUsuarios();
  });
}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
