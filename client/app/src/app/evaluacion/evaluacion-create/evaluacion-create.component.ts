import { Inject, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { CompraByClienteComponent } from 'src/app/compra/compra-by-cliente/compra-by-cliente.component';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { EvaluacionCreateVendedorComponent } from '../evaluacion-create-vendedor/evaluacion-create-vendedor.component';

@Component({
  selector: 'app-evaluacion-create',
  templateUrl: './evaluacion-create.component.html',
  styleUrls: ['./evaluacion-create.component.css'],
})
export class EvaluacionCreateComponent implements OnInit {
  datosDialog: any;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  orden: any;
  uniqueVendorInfo: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['vendedor', 'acciones'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private noti: NotificacionService,
    private dialogRef: MatDialogRef<CompraByClienteComponent>,
    private fb: FormBuilder
  ) {
    this.datosDialog = data;
  }
  ngOnInit(): void {
    if (this.datosDialog.idOrden) {
      console.log('idOrden', this.datosDialog);
      this.obtenerOrden(this.datosDialog.idOrden);
    }
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    console.log('id usuario: ' + this.currentUser.user.id);
  }
  obtenerOrden(idOrden: number) {
    this.gService
      .get('compra/', idOrden)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.orden = data;
        console.log(this.orden);
        const uniqueVendorInfoMap = new Map<number, any>();
        this.orden.CompraDetalle.forEach((detalle) => {
          const vendorId = detalle.producto.vendedor.id;
          const vendorName = detalle.producto.vendedor.NombreVendedor;
          // If the vendor ID is not already in the Map, add it
          if (!uniqueVendorInfoMap.has(vendorId)) {
            uniqueVendorInfoMap.set(vendorId, {
              id: vendorId,
              name: vendorName,
              starStates: [false, false, false, false, false],
            });
          }
        });
        // Convert the Map values to an array of objects
        this.uniqueVendorInfo = Array.from(uniqueVendorInfoMap.values());
        console.log('VendedorInfo: ', this.uniqueVendorInfo);

        this.dataSource = new MatTableDataSource(this.uniqueVendorInfo);
        this.dataSource.paginator = this.paginator;
      });
  }

  evaluacion(idVendedor: number) {
    this.evaluacionByOrdenId(this.datosDialog.idOrden, idVendedor).subscribe(
      (evaluacionVacia) => {
        console.log('hasEvaluacion', evaluacionVacia);
        if (evaluacionVacia) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = false;
          dialogConfig.data = {
            idVendedor: idVendedor,
            idOrden: this.datosDialog.idOrden,
          };
          this.dialog.open(EvaluacionCreateVendedorComponent, dialogConfig);
        } else {
          this.noti.mensaje(
            'Evaluación ya registrada para este proveedor',
            'Ya hay una evaluación registrada para esta orden y proveedor',
            TipoMessage.error
          );
        }
      },
      (error) => {
        // Manejar errores en la suscripción, si es necesario
        console.error('Error al obtener evaluación: ', error);
      }
    );
  }

  evaluacionByOrdenId(ordenId: number, evaluadoId: number) {
    const endpoint = `evaluacion/orden/${ordenId}/evaluado/${evaluadoId}`;
    return this.gService.getByUrl(endpoint).pipe(
      takeUntil(this.destroy$),
      map((data: any) => {
        console.log('data', data);
        return data.length === 0;
      })
    );
  }
}
