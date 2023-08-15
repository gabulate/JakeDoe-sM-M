import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { LocationService } from 'src/app/share/location.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserCreateDireccionComponent } from '../user-create-direccion/user-create-direccion.component';
import { UserCreateDiagComponent } from '../user-create-diag/user-create-diag.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  hide = true;
  usuario: any;
  roles: any;
  tipoPagos: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  // arrays del api
  provincias: any[] = [];
  cantones: any[] = [];
  distritos: any[] = [];

  //provincia seleccionada
  provinciaSelected: string;
  //canton seleccionado
  cantonSelected: string;
  //distrito seleccionado
  distritoSelected: string;
  userForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private authService: AuthenticationService,
    private locationService: LocationService,
    private dialog: MatDialog
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(8)]],
      password: ['', [Validators.required]],
      rolesSeleccionados: ['', [Validators.required]],
      nombreVendedor: ['', ],
    });
    this.getRoles();
    this.getTipoPago();
  }

  ngOnInit(): void {
    this.locationService.getProvincias().subscribe((data) => {
      this.provincias = this.transformJSONToArray(data);
      console.log('provincias', this.provincias);
    });
  }
  private transformJSONToArray(jsonData: any): any[] {
    return Object.keys(jsonData).map((key) => ({
      id: key,
      nombre: jsonData[key],
    }));
  }

  onProvinceChange(provinceId: any): void {
    console.log('provinciaId:', provinceId);
    //se obtiene el nombre de la provincia
    const selectedProvince = this.provincias.find(
      (provincia) => provincia.id === provinceId
    );
    this.provinciaSelected = selectedProvince ? selectedProvince.nombre : '';
    console.log('Nombre provincia: ', this.provinciaSelected);

    //se envía provinciaId al servicio para obtener la lista de cantones
    this.locationService
      .getCantonesByProvincia(parseInt(provinceId))
      .subscribe((data) => {
        console.log('provinciaId seleccionado: ', provinceId);
        this.cantones = this.transformJSONToArray(data);
        console.log('cantones ', this.cantones);
        this.distritos = [];
      });
  }
  onCantonChange(provinceId: any, cantonId: any): void {
    console.log('provinciaId seleccionado: ', provinceId);
    console.log('cantonId seleccionado: ', cantonId);
    //se obtiene el nombre del canton
    const selectedCanton = this.cantones.find(
      (canton) => canton.id === cantonId
    );
    this.cantonSelected = selectedCanton ? selectedCanton.nombre : '';
    console.log('Nombre cantón: ', this.cantonSelected);

    //se envía provinciaId y cantonId al servicio para obtener la lista de distritos
    this.locationService
      .getDistritosByCanton(parseInt(provinceId), parseInt(cantonId))
      .subscribe((data) => {
        this.distritos = this.transformJSONToArray(data);
        console.log('distritos: ', this.distritos);
      });
  }
  onDistritoChange(distritoId: any): void {
    console.log('distritoId seleccionado: ', distritoId);

    //se obtiene el nombre del distrito
    const selectedDistrito = this.distritos.find(
      (distrito) => distrito.id === distritoId
    );
    this.distritoSelected = selectedDistrito ? selectedDistrito.nombre : '';
    console.log('Nombre distrito: ', this.distritoSelected);
  }

  submitForm() {
    this.makeSubmit = true;

    //Validación
    if (this.formCreate.invalid) {
      return;
    }

    this.authService.createUser(this.formCreate.value).subscribe(
      (data: any) => {
        console.log('FUNCIONA- Usuario creado:', data);
        console.log(data.data.id);
        this.redireccion(data.data.id);
        // this.router.navigate(['/usuario/direccionpago', data.data.id],{
        //   relativeTo: this.route,
        // });
      },
      (error: any) => {
        console.log(error);
        console.log('no funciona');
      }
    );
  }
  redireccion(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    //"abra el elemento q se va a convertir en el dialogo"
    this.dialog.open(UserCreateDiagComponent, dialogConfig);
  }
  onReset() {
    this.formCreate.reset();
  }
  getRoles() {
    this.gService
      .list('rol')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.roles = data.filter((rol: any) => rol.id === 2 || rol.id === 3);
        console.log(this.roles);
      });
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

  public errorHandling = (control: string, error: string) => {
    const rolesSeleccionados = this.formCreate.get('rolesSeleccionados').value;

    if (control === 'nombreVendedor' && rolesSeleccionados.includes(3)) {
      return (
        this.formCreate.controls[control].hasError(error) &&
        this.formCreate.controls[control].invalid &&
        (this.makeSubmit || this.formCreate.controls[control].touched)
      );
    } else {
      return (
        this.formCreate.controls[control].hasError(error) &&
        this.formCreate.controls[control].invalid &&
        (this.makeSubmit || this.formCreate.controls[control].touched)
      );
    }
  };
}

// this.gService
// .create('usuario/registrar',this.formCreate.value)
// .pipe(takeUntil(this.destroy$))
// .subscribe((respuesta:any)=>{
//   this.usuario=respuesta;
//   console.log(this.usuario);
//   console.log(respuesta);
//   this.router.navigate(['/usuario/login'],{
//     //Mostrar un mensaje
//     queryParams:{register:'true'},
//   })
// })
