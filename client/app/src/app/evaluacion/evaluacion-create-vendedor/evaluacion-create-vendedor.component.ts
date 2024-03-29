import { Inject, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CompraByClienteComponent } from 'src/app/compra/compra-by-cliente/compra-by-cliente.component';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CalificacionService } from 'src/app/share/calificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-evaluacion-create-vendedor',
  templateUrl: './evaluacion-create-vendedor.component.html',
  styleUrls: ['./evaluacion-create-vendedor.component.css'],
})
export class EvaluacionCreateVendedorComponent implements OnInit {
  data:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosDialog: any;
  orden: any;
  uniqueVendorInfo: any;
  evaluacion: any;
  comentarioForm: FormGroup;
  comentario: any;
  submitted = false;
  currentUser: any;
  vendedorId: any;
  vendedor: any;
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
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialogRef: MatDialogRef<CompraByClienteComponent>,
    private authService: AuthenticationService,
    private calificacionService: CalificacionService,
    private noti: NotificacionService
  ) {
    this.datosDialog = data;
    this.formularioReactive();
  }

  formularioReactive() {
    this.comentarioForm = this.fb.group({
      idOrden: [null, null],
      clienteId: [null, null],
      vendedorId: [null, null],
      comentario: [null, null],
    });
  }

  ngOnInit(): void {
    if (this.datosDialog.idOrden) {
      console.log('idOrden', this.datosDialog.idOrden);
      console.log('idVendedor', this.datosDialog.idVendedor);

      this.obtenerVendedor(this.datosDialog.idVendedor);
    }
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    console.log('id usuario autenticado: ' + this.currentUser.user.id);
  }

  changeIcon(index: number) {
    this.stars = this.stars.map((star, i) =>
      i <= index - 1 ? 'star_rate' : 'star_border'
    );
  }

  keepIcon(index: number) {
    this.starStates = this.starStates.map((_, i) => i <= index - 1);
    const total = this.starStates.filter((state) => state).length;
    console.log('rating', total);
    // Actualizar la última evaluación para el vendedor en el objeto temporal
    this.lastEvaluations[this.vendedor.id] = total;
  }

  guardarEvaluacion() {
    for (const vendorId in this.lastEvaluations) {
      if (this.lastEvaluations.hasOwnProperty(vendorId)) {
        const evaluacion = {
          OrdenId: this.datosDialog.idOrden,
          EvaluadorId: this.currentUser.user.id,
          EvaluadoId: parseInt(this.vendedor.id), // Convertir a número
          Puntuacion: this.lastEvaluations[vendorId],
          Comentario: this.comentarioForm.get('comentario').value,
        };
        this.evaluacion = evaluacion;
      }
    }

    this.gService
      .create('evaluacion', this.evaluacion)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        const evaluadoId = parseInt(this.vendedor.id);
          this.calificacionService.getCalificacionesUsuario(evaluadoId)
            .subscribe((calificaciones: any[]) => {
              const promedio = this.calificacionService.calcularCalificacionPromedio(calificaciones);
              console.log('Calificación promediada:', promedio);
              this.calificacionService.actualizarCalificacionPromedio(evaluadoId,promedio)
              .subscribe((response:any)=>{
                console.log('Promedio actualizado', response);
              })
            });
         console.log('evaluacion cliente->vendedor guardada: ', data);
         this.noti.mensaje(
          'Gracias por su evaluación',
          'Se ha registrado su validación exitosamente' , TipoMessage.success
        );
        this.close();
      });
      
  }

  crearPregunta() {
    this.submitted = true;
    if (this.comentarioForm.invalid) {
      return;
    }
    this.comentarioForm.patchValue({});
    console.log(this.comentarioForm.value);
  }

  obtenerVendedor(idVendedor: number) {
    this.gService
      .get('usuario/', idVendedor)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.vendedor = data;
        console.log(this.vendedor);
      });
  }

  close() {
    this.dialogRef.close();
  }
}
