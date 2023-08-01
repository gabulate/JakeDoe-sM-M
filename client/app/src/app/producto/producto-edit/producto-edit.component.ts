import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css'],
})
export class ProductoEditComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de generos
  CategoriaList: any;
  //producto a actualizar
  productoInfo: any;
  //Respuesta del API crear/modificar
  respProducto: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  productoForm: FormGroup;
  //id del Producto
  idProducto: number = 0;
  //Sí es crear
  isCreate: boolean = true;
  //Autenticación
  isAutenticated: boolean;
  //Usuario Actual
  currentUser: any;
  //USuario Id
  clienteId: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService,
  ) {
    this.formularioReactive();
    this.listaCategorias();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    this.clienteId = this.authService.UsuarioId;
    console.log('Cliente: ', this.currentUser.user.id);

    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id'];
      if (this.idProducto != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener producto a actualizar del API
        this.gService
          .get('producto', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.productoInfo = data;
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA', this.productoInfo);

            //Establecer los valores en cada una de las entradas del formulario
            this.productoForm.setValue({
              id: this.productoInfo.id,
              nombre: this.productoInfo.Nombre,
              descripcion: this.productoInfo.Descripcion,
              precio: this.productoInfo.Precio,
              cantidad: this.productoInfo.Cantidad,
              vendedorId: this.productoInfo.VendedorId,
              borrado: this.productoInfo.Borrado,
              categoria: this.productoInfo.CategoriaId,

              fotos: '',
            });

            console.log(this.productoForm.value);
          });
      }
    });
  }
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.productoForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      vendedorId: [null, Validators.required],
      categoria: [null, Validators.required],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      borrado: [false, Validators.required],
      cantidad: [null, Validators.required],
      fotos: [null, Validators.required],
    });
  }

  listaCategorias() {
    this.CategoriaList = null;
    this.gService
      .list('categoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.CategoriaList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.productoForm.controls[control].hasError(error);
  };
  //Crear Videojueogo
  crearProducto(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    this.productoForm.patchValue({ id: 0 });
    ////////////////////////////////////////////////////////PONER AQUI EL USUARIO QUE LO CREA
    this.productoForm.patchValue({ vendedorId: 4 });

    console.log(this.productoForm.value);

    if (this.productoForm.invalid) {
      return;
    }

    const formData = new FormData();
    const formValue = this.productoForm.value;

    // Agregar los datos al FormData
    Object.keys(formValue).forEach((key) => {
      const value = formValue[key];

      console.log(formValue);

      if (key === 'fotos') {
        // If the key is 'fotos', it contains an array of files, so we need to handle it differently
        const files: File[] = value as File[];
        for (const file of files) {
          formData.append('fotos', file, file.name);
        }
      } else {
        // Agregar otros valores al FormData
        formData.append(key, value);
      }
    });

    //Accion API create enviando toda la informacion del formulario
    this.gService
      .create('producto', formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respProducto = data;
        this.router.navigate(['/producto/' + this.respProducto.data.id]);
      });
  }

  //Actualizar Videojuego
  actualizarVideojuego() {
    //Establecer submit verdadero
    this.submitted = true;

    this.productoForm.patchValue({ id: this.idProducto });
    ////////////////////////////////////////////////////////PONER AQUI EL USUARIO QUE LO CREA
    this.productoForm.patchValue({ vendedorId: 0 });

    console.log(this.productoForm.value);

    if (this.productoForm.invalid) {
      return;
    }

    const formData = new FormData();
    const formValue = this.productoForm.value;

    console.log(formValue);

    // Agregar los datos al FormData
    Object.keys(formValue).forEach((key) => {
      const value = formValue[key];

      if (key === 'fotos') {
        // If the key is 'fotos', it contains an array of files, so we need to handle it differently
        const files: File[] = value as File[];
        for (const file of files) {
          formData.append('fotos', file, file.name);
        }
      } else {
        // Agregar otros valores al FormData
        formData.append(key, value);
      }
    });

    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('producto', formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respProducto = data;
        this.router.navigate(['/producto/' + this.productoForm.value.id], {
          queryParams: { update: 'true' },
        });
      });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const imageArray: File[] = [];
      for (const file of files) {
        imageArray.push(file);
      }
      // Limitar la cantidad de imágenes a 5 antes de asignar al formulario
      const maxImages = 5;
      const imagesToUpload = imageArray.slice(0, maxImages);
      this.productoForm.patchValue({ fotos: imagesToUpload });
    }
  }

  countSelectedImages(): number {
    const myFileControl = this.productoForm.get('fotos');
    return myFileControl.value ? myFileControl.value.length : 0;
  }

  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/admin/producto']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
