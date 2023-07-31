import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

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

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaCategorias();
  }

  ngOnInit(): void {
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
            console.log(this.productoInfo.categoria);

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

              //FotoProducto: this.productoInfo.FotoProducto.map(({ id }) => id),
            });
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

    console.log(this.productoForm);
    
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
        this.router.navigate(['/producto/' + this.respProducto.id], {
          queryParams: { create: 'true' },
        });
      });
  }

  //Actualizar Videojuego
  actualizarVideojuego() {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
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
