import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/share/authentication.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
})
export class ProductoDetailComponent implements OnInit {
  datos: any;
  listaRecomendados: any;
  datosMensaje: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  listaFotos: any[] = [];
  preguntaForm: FormGroup;
  submitted = false;
  respMensaje: any;
  productoId: any;
  //clienteId = 1;
  clienteId: any;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private sanitizer: DomSanitizer,
    private cartService: CartService,
    private notificacion: NotificacionService,
    private authService: AuthenticationService
  ) {
    this.formularioReactive();
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.productoId = Number(id);
      this.obtenerProducto(Number(id));
      this.listarMensajes(Number(id));
      //this.obtenerFotosProducto(Number(id));
      this.listarProductos();
    }
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.clienteId = this.currentUser.user.id;
    console.log('id usuario: ' + this.clienteId);
  }

  obtenerProducto(id: any) {
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }

  listarMensajes(id: number) {
    this.gService
      .list(`mensaje/producto/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datosMensaje = data;
      });
  }

  getImageUrl(image) {
    let binary = '';
    const bytes = new Uint8Array(image);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Image = window.btoa(binary);
    const imageUrl = 'data:image/jpeg;base64,' + base64Image;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  //Para el listado de productos recomendados
  //Quiero hacer que muestre solo productos de la misma categoría pero ya despuééés lo hago
  listarProductos() {
    this.gService
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.listaRecomendados = data;
      });
  }

  detalleProducto(id: number) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/producto/' + id]));
  }
  formularioReactive() {
    //[null, Validators.required]
    this.preguntaForm = this.fb.group({
      id: [null, null],
      clienteId: [null, null],
      pregunta: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          this.noWhitespaceValidator,
        ]),
      ],
    });
  }

  crearPregunta() {
    this.submitted = true;
    if (this.preguntaForm.invalid) {
      return;
    }
    this.preguntaForm.patchValue({
      id: this.productoId,
      clienteId: this.clienteId,
    });
    console.log(this.preguntaForm.value);
    this.gService
      .create('mensaje', this.preguntaForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respMensaje = data;

        let pre = document.getElementById('Preguntas');

        this.listarMensajes(this.productoId);
        this.datosMensaje.next();
        /* pre.innerHTML =
        "<mat-card class='mat-mdc-card mdc-card dashboard-card ng-star-inserted'>"
        +'   <mat-card-subtitle class="mat-mdc-card-subtitle">'
       + '    <p>Pregunta</p>'
       + '  </mat-card-subtitle>'
       + "     <mat-card-content class='mat-mdc-card-content dashboard-card-content'>"
       + '    <div> '+ this.respMensaje.Pregunta + '</div>'
       + '     </mat-card-content>'
       + '    </mat-card>'
       + ' <br> </br>'
        + pre.innerHTML;
 */
      });

    this.preguntaForm.reset();
  }

  comprar(idProducto) {
    try {
      this.gService
        .get('producto', idProducto)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Agregar videojuego obtenido del API al carrito
          this.cartService.addToCart(data);
          //Notificar al usuario
          this.notificacion.mensaje(
            'Orden',
            'Se ha agregado: ' + data.Nombre + ' al carrito de compras.',
            TipoMessage.success
          );
          //console.log('CARRITO: ', this.cartService.getItems);
          this.router.navigate(['/facturacion/carrito'], {
            relativeTo: this.route,
          });
        });
    } catch {
      this.notificacion.mensaje(
        'Orden',
        'Ha ocurrido un error al añadir el producto al carrito :(.',
        TipoMessage.error
      );
    }
  }

  onReset() {
    this.submitted = false;
    this.preguntaForm.reset();
  }
  onBack() {
    this.router.navigate(['/producto', this.productoId], {
      state: { datos: this.datos },
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.preguntaForm.controls[control].hasError(error);
  };

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
