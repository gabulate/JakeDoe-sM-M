import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  //Listas
  CategoriaList: any;
  EstadoList: any;

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
  //Lista de fotos
  fotos: any = [];
  foto: any;
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
    private authService: AuthenticationService
  ) {
    this.formularioReactive();
    this.listaCategorias();
    this.listaEstados();
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
              estado: this.productoInfo.EstadoId,
              fotos: this.productoInfo.FotoProducto,
            });

            this.fotos = this.productoForm.value.fotos;
            console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', this.fotos);
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
        Validators.compose([
          Validators.required, 
          Validators.minLength(3),
          this.noWhitespaceValidator
        ]),
      ],
      vendedorId: [null, Validators.required],
      categoria: [null, Validators.required],
      estado: [null, Validators.required],
      descripcion: [
        null, 
          Validators.compose([
          Validators.required, 
          Validators.minLength(3),
          this.noWhitespaceValidator
        ]),
      ],
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

  listaEstados() {
    this.EstadoList = null;
    this.gService
      .list('estadoProducto')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.EstadoList = data;
      });
  }


  //Crear Videojueogo
  crearProducto(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación

    this.productoForm.patchValue({ id: 0 });
    this.productoForm.patchValue({ fotos: this.fotos });
    ////////////////////////////////////////////////////////PONER AQUI EL USUARIO QUE LO CREA
    this.productoForm.patchValue({ vendedorId: this.currentUser.user.id });

    console.log(this.productoForm.value);

    if (this.productoForm.invalid) {
      return;
    }

    //Accion API create enviando toda la informacion del formulario
    this.gService
      .create('producto', this.productoForm.value)
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
    this.productoForm.patchValue({ fotos: this.fotos });
    ////////////////////////////////////////////////////////PONER AQUI EL USUARIO QUE LO CREA
    this.productoForm.patchValue({ vendedorId: 0 });

    console.log(this.productoForm.value);

    if (this.productoForm.invalid) {
      return;
    }

    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('producto', this.productoForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respProducto = data;
        this.router.navigate(['/producto/' + this.productoForm.value.id], {
          queryParams: { update: 'true' },
        });
      });
  }

  //Codigo robado, no me pregunte como funciona
  onFileChange(event): any {
    this.fotos = [];

    if (event.target.files) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          // Comprimir imagenes para que no crashee el server
          if (!this.foto) this.foto = new Image();

          this.foto.src = reader.result as string;
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/jpeg', 0.5);
            // console.log(dataURL);
            if (!this.isCreate) {
              // If in update mode, push an object with the image property
              this.fotos.push({ Foto: dataURL.split(',')[1] });
            } else {
              // If not in update mode, push the base64 string directly
              this.fotos.push(dataURL);
            }
          };
          img.src = reader.result as string;
        };
      }
    }

    console.log('Fotos subidas: ', this.fotos);
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

  public errorHandling = (control: string, error: string) => {
    return this.productoForm.controls[control].hasError(error);
  };
  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length? null : { 'whitespace': true };       
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
