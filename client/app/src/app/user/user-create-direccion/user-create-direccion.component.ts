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
import { LocationService } from 'src/app/share/location.service';

@Component({
  selector: 'app-user-create-direccion',
  templateUrl: './user-create-direccion.component.html',
  styleUrls: ['./user-create-direccion.component.css'],
})
export class UserCreateDireccionComponent implements OnInit {
  usuarioId: number;
  usuario: any;
  tipoPagos: any;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  direccionForms: FormGroup[] = [];
  numDireccionForms: number = 0;
  direccion: any;
  minFormulariosExitosos = 3;
  // arrays del api
  provincias: any[] = [];
  cantones: any[] = [];
  distritos: any[] = [];

  provinciaSelected: string; //provincia seleccionada
  cantonSelected: string; //canton seleccionado
  distritoSelected: string; //distrito seleccionado

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private authService: AuthenticationService,
    private locationService: LocationService
  ) {}

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
      });
    }
    console.log(id);
    console.log('cant direcciones en onInit', this.numDireccionForms);

    this.locationService.getProvincias().subscribe((data) => {
      this.provincias = this.transformJSONToArray(data);
      console.log('provincias', this.provincias);
    });
  }

  obtenerCantidadForms() {
    const rolesIds = this.usuario.Roles.map((rol: any) => rol.rol.id);
    if (rolesIds.includes(2)) {
      this.numDireccionForms += 2;
    }
    if (rolesIds.includes(3)) {
      this.numDireccionForms += 1;
    }
    console.log('cant direcciones en meto', this.numDireccionForms);
  }

  reactiveForms() {
    for (let i = 0; i < this.numDireccionForms; i++) {
      const formDireccion = this.fb.group({
        usuarioId: [null, null],
        titulo: [
          '',
          [
            Validators.required,
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
            ]),
          ],
        ],
        codPostal: [
          '',
          [
            Validators.required,
            Validators.compose([
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(4),
            ]),
          ],
        ],
        telefono: [
          '',
          [
            Validators.required,
            Validators.compose([
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(8),
            ]),
          ],
        ],
        provincia: ['', [Validators.required]],
        canton: ['', [Validators.required]],
        distrito: ['', [Validators.required]],
        detalle: [
          '',
          [
            Validators.required,
            Validators.compose([
              Validators.required,
              Validators.minLength(3)
            ]),
          ],
        ],
      });
      console.log(formDireccion);
      this.direccionForms.push(formDireccion);
    }
  }

  obtenerListaDirecciones() {}

  guardarDireccion(i: number) {
    this.makeSubmit = true;
    const direccionForm = this.direccionForms[i];
    if (direccionForm.valid) {
      direccionForm.patchValue({
        usuarioId: this.usuarioId,
        provincia: this.provinciaSelected,
        distrito: this.distritoSelected,
        canton: this.cantonSelected,
      });
      console.log(direccionForm.value);
      this.gService
        .create('direccion', direccionForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.direccion = data;
            console.log('direccion => ', this.direccion);
            this.obtenerListaDirecciones();
            // this.siguiente();
          },
          (error: any) => {
            console.error(error);
          }
        );
    } else {
      console.log('El formulario no es válido. No se enviará la respuesta.');
    }
  }

  siguiente() {
    // const numFormulariosExitosos = this.direccionForms.filter(
    //   (form) => form.valid
    // ).length;
    // Verificar si se cumple el mínimo de formularios exitosos
    // if (numFormulariosExitosos >= this.minFormulariosExitosos) {
    //   const rolesIds = this.usuario.Roles.map((rol: any) => rol.rol.id);
    //   if (rolesIds.includes(2)) {
    //     this.router.navigate(['/metodopago/usuario', this.usuarioId], {
    //       relativeTo: this.route,
    //     });
    //   } else if (rolesIds.length === 1 && rolesIds[0] === 3) {
    //     this.router.navigate(['/'], {
    //       relativeTo: this.route,
    //     });
    //   }
    // } else {
    //   // Activar los errores de todos los formularios
    //   this.direccionForms.forEach((form) => {
    //     Object.keys(form.controls).forEach((controlName) => {
    //       form.get(controlName)?.markAsTouched();
    //     });
    //   });
    // }

    /* const rolesIds = this.usuario.Roles.map((rol: any) => rol.rol.id);
    if (rolesIds.includes(2)) {
      this.router.navigate(['/metodopago/usuario', this.usuarioId],{
        relativeTo: this.route,
      });
    }
    else if (rolesIds.length ===1 && rolesIds[0]===3) {
      this.router.navigate(['/'],{
        relativeTo: this.route,
      });
    } */

    const numFormulariosExitosos = this.direccionForms.filter(
      (form) => form.valid
    ).length;
  
    const rolesIds = this.usuario.Roles.map((rol: any) => rol.rol.id);
    
    if (rolesIds.includes(2)) {
      // Si hay un rol con ID 2, establecer minFormulariosExitosos en 2
      this.minFormulariosExitosos = 2;
    }
  
    if (numFormulariosExitosos >= this.minFormulariosExitosos) {
      if (rolesIds.includes(2)) {
        this.router.navigate(['/metodopago/usuario', this.usuarioId], {
          relativeTo: this.route,
        });
      } else if (rolesIds.length === 1 && rolesIds[0] === 3) {
        this.router.navigate(['/'], {
          relativeTo: this.route,
        });
      }
    } else {
      this.direccionForms.forEach((form) => {
        Object.keys(form.controls).forEach((controlName) => {
          form.get(controlName)?.markAsTouched();
        });
      });
    }



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

  public errorHandling = (i: number, control: string, error: string) => {
    return (
      this.direccionForms[i].get(control)?.hasError(error) &&
      this.direccionForms[i].get(control)?.invalid &&
      (this.makeSubmit || this.direccionForms[i].get(control)?.touched)
    );
  };
  // public async  noWhitespaceValidator(control: FormControl) {
  //   return (control.value || '').trim().length ? null : { whitespace: true };
  // }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
