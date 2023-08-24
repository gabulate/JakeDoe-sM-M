import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { DateTime } from 'luxon';
import {NotificacionService,TipoMessage} from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-create-pago',
  templateUrl: './user-create-pago.component.html',
  styleUrls: ['./user-create-pago.component.css'],
})
export class UserCreatePagoComponent implements OnInit {
  sentForms: boolean[] = [];

  usuarioId: number;
  usuario: any;
  tipoPagos: any;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  metodosPagoForms: FormGroup[] = [];
  numMetodosPagoForms: number = 0;
  metodosPago: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private authService: AuthenticationService,
    private noti: NotificacionService
  ) {}

  getNextMonthFirstDay() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return nextMonth;
  }


  getUsuario(id: number) {
    return this.gService.get('usuario', id).pipe(takeUntil(this.destroy$));
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.usuarioId = Number(id);
      this.getUsuario(Number(id)).subscribe((usuario: any) => {
        this.usuario = usuario;
        this.obtenerCantidadForms(); // Calcula numDireccionForms aquí
        this.reactiveForms(); // Llama a reactiveForm después de calcular numDireccionForms
        this.getTipoPago();
      });
    }
    console.log(id);
    console.log('cant metodos en onInit', this.numMetodosPagoForms);
  }

  obtenerCantidadForms() {
    const rolesIds = this.usuario.Roles.map((rol: any) => rol.rol.id);
    if (rolesIds.includes(2)) {
      this.numMetodosPagoForms += 2;
    }
    // if (rolesIds.includes(3)) {
    //   this.numMetodosPagoForms += 1;
    // }
    console.log('cant metodos en meto', this.numMetodosPagoForms);
  }

  reactiveForms() {
    for (let i = 0; i < this.numMetodosPagoForms; i++) {
      const formMetodos = this.fb.group({
        usuarioId: [null, null],
        titulo: ['', [Validators.required, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          this.noWhitespaceValidator
        ])]],
        tipoPago: ['', [Validators.required]],
        cuenta: ['', [Validators.required, Validators.compose([
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
          this.noWhitespaceValidator
        ])]],
        expira: ['', [Validators.required]],
      });
      console.log(formMetodos);
      this.metodosPagoForms.push(formMetodos);
    }
  }
  guardarMetodo(i: number) {
    this.makeSubmit = true;
    const metodoForm = this.metodosPagoForms[i];
    if (metodoForm.valid) {
      metodoForm.patchValue({
        usuarioId: this.usuarioId,
      });
      const expirationDate = DateTime.fromJSDate(metodoForm.value.expira);
      const formattedDate = expirationDate.toISO();
      console.log(metodoForm.value);
      this.gService
        .create('metodoPago', metodoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.metodosPago = data;
            console.log('metodo =>', this.metodosPago);
            this.noti.mensaje(
              'Método de pago guardado',
              'Se ha registrado un método de pago correctamente' , TipoMessage.success
              );
            this.obtenerListaMetodos();
            this.sentForms[i] = true;
          },
          (error: any) => {
            console.error(error);
          }
        );
    } else {
      this.noti.mensaje(
        'Oops!',
        'Algo pasó. Revise sus respuestas' , TipoMessage.error
        );
      console.log('El formulario no es válido. No se enviará la respuesta.');
    }
  }
  getTipoPago() {
    this.gService
      .list('tipoPago/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.tipoPagos = data;
        console.log(this.tipoPagos);
      });
  }
  obtenerListaMetodos() {}
  public errorHandling = (i: number, control: string, error: string) => {
    return (
      this.metodosPagoForms[i].get(control)?.hasError(error) &&
      this.metodosPagoForms[i].get(control)?.invalid &&
      (this.makeSubmit || this.metodosPagoForms[i].get(control)?.touched)
    );
  };

  getNumFormulariosEnviados() {
    return this.sentForms.filter((form) => form).length;
  }
  siguiente() {

    this.router.navigate(['/usuario/login'], {
      relativeTo: this.route,
    });
  }
  getPrimerDiaMesSiguiente() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return nextMonth;
  }
  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
  onReset() {}
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
