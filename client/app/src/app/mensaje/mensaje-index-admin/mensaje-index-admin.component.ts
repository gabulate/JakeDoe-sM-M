import {  AfterViewInit,  Component,  Inject,  OnInit,  ViewChild,} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mensaje-index-admin',
  templateUrl: './mensaje-index-admin.component.html',
  styleUrls: ['./mensaje-index-admin.component.css']
})
export class MensajeIndexAdminComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  isAutenticated: boolean;
  //Usuario Actual
  currentUser: any;
  //USuario Id
  clienteId: any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['foto','producto',  'acciones' ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {}

  ngAfterViewInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );
    this.clienteId = this.authService.UsuarioId;
    console.log('Cliente: ', this.currentUser.user.id);

  
    this.listaProductos();
  }
  
  listaProductos() {
    this.gService
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  mensajes(id:number){
    this.router.navigate(['/mensaje/producto', id], {
      relativeTo: this.route,
    });
  }

  getImageUrl(image) {
    if (image == undefined) {
      return this.sanitizer.bypassSecurityTrustUrl('assets/img/logov2.png');
    }

    let binary = '';
    const bytes = new Uint8Array(image);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Image = window.btoa(binary);
    const imageUrl = 'data:image/jpeg;base64,' + base64Image;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
