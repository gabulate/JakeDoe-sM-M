import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  hide = true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  currentUser: any;
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }
  // Definir el formulario con su reglas de validación
  reactiveForm() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.mensajes();
  }

  mensajes() {
    let register = false;
    let auth = '';
    //Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      register = params['register'] === 'true' || false;
      auth = params['auth'] || '';
      if (register) {
        this.notificacion.mensaje(
          'Usuario',
          'Usuario registrado! Especifique sus credenciales',
          TipoMessage.success
        );
      }
      if (auth) {
        this.notificacion.mensaje(
          'Usuario',
          'Acceso denegado',
          TipoMessage.warning
        );
      }
    });
  }
  onReset() {
    this.formulario.reset();
  }
  submitForm() {
    this.makeSubmit = true;
    //Validación
    if (this.formulario.invalid) {
      return;
    }

    console.log(this.formulario.value);

    this.authService.loginUser(this.formulario.value).subscribe(
      (respuesta: any) => {
        console.log(respuesta);

        if (this.isAdmin()) {
          this.router.navigate(['/admin/dashboard/']);
        } else if(this.isVendedor()){
          this.router.navigate(['/vendedor/dashboard/']);
        } else{
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.notificacion.mensaje(
          'Usuario',
          'Acceso denegado',
          TipoMessage.error
        );

        this.formulario.patchValue({ email: '', password: '' });
      }
    );

    console.log('aaaaaaaaaaaaaaaaaaaa');
  }
  /* Manejar errores de formulario en Angular */

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

  isAdmin() {
    let userRole = [];
    if (this.currentUser) {
      for (let index = 0; index < this.currentUser.user.Roles.length; index++) {
        userRole[index] = this.currentUser.user.Roles[index].RolId;
      }
    }

    for (let index = 0; index < userRole.length; index++) {
      if (userRole[index] === 1) {
        return true;
      }
    }
    return false;
  }

  isVendedor() {
    let userRole = [];
    if (this.currentUser) {
      for (let index = 0; index < this.currentUser.user.Roles.length; index++) {
        userRole[index] = this.currentUser.user.Roles[index].RolId;
      }
    }

    for (let index = 0; index < userRole.length; index++) {
      if (userRole[index] === 3) {
        return true;
      }
    }
    return false;
  }
}
