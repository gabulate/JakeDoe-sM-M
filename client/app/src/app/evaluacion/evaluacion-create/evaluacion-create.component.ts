import { Inject, Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CompraByClienteComponent } from 'src/app/compra/compra-by-cliente/compra-by-cliente.component';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-evaluacion-create',
  templateUrl: './evaluacion-create.component.html',
  styleUrls: ['./evaluacion-create.component.css'],
})
export class EvaluacionCreateComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosDialog: any;
  orden: any;
  uniqueVendorInfo: any;
  evaluaciones: any[] = [];
  currentUser: any;
  total: number = 0;
  stars: string[] = [
    'star_border',
    'star_border',
    'star_border',
    'star_border',
    'star_border',
  ];
  starStates: boolean[] = [false, false, false, false, false];
  lastEvaluations: { [vendorId: number]: number } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialogRef: MatDialogRef<CompraByClienteComponent>,
    private authService: AuthenticationService
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
  /*   changeIcon(index: number) {
    this.stars = this.stars.map((star, i) =>
      i < index ? 'star_rate' : 'star_border'
    );
  }
  keepIcon(index: number) {
    this.starStates = this.starStates.map((star, i) => i <= index - 1);
    this.total = this.starStates.filter((state) => state).length;
    console.log('cuenta', this.total);
  } */

  changeIcon(vendorInfo: any, index: number) {
    vendorInfo.starStates = vendorInfo.starStates.map((_, i) =>
      i <= index - 1 ? true : false
    );
  }

  keepIcon(vendorInfo: any, index: number) {
    vendorInfo.starStates = vendorInfo.starStates.map((_, i) => i <= index - 1);
    const total = vendorInfo.starStates.filter((state) => state).length;
    console.log('rating', vendorInfo.name, total);
    // Actualizar la última evaluación para el vendedor en el objeto temporal
    this.lastEvaluations[vendorInfo.id] = total;
  }

  guardarEvaluacion() {
    for (const vendorId in this.lastEvaluations) {
      if (this.lastEvaluations.hasOwnProperty(vendorId)) {
        const evaluacion = {
          OrdenId: this.orden.id,
          EvaluadorId: this.currentUser.user.id,
          EvaluadoId: parseInt(vendorId), // Convertir a número
          Puntuacion: this.lastEvaluations[vendorId],
        };
        this.evaluaciones.push(evaluacion);
      }
      this.close();
    }

    for (const evaluacion of this.evaluaciones) {
      this.gService
        .create('evaluacion', evaluacion)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log('evaluacion guardada: ', data);
        });
    }
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
      });
  }

  close() {
    this.dialogRef.close();
  }
}

