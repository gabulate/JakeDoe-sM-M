import { CartService, ItemCart } from 'src/app/share/cart.service';
import { Component, OnInit } from '@angular/core';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css'],
})
export class ConfirmarComponent implements OnInit {
  compraForm: FormGroup;
  total = 0;
  subtotal = 0;
  fecha = Date.now();
  destroy$: Subject<boolean> = new Subject<boolean>();
  qtyItems = 0;
  isAutenticated: boolean;
  currentUser: any;
  clienteId: any;
  detalles: any;

  DireccionList: any;
  Direccion: any;
  MetodoPagoList: any;
  MetodoPago: any;
  //Tabla
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private noti: NotificacionService,
    private route: ActivatedRoute,
    private gService: GenericService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.qtyItems = this.cartService.quantityItems();
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    this.clienteId = this.authService.UsuarioId;

    this.cartService.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      //console.log('carrito', data);
    });

    this.total = this.cartService.getTotal();
    this.subtotal = this.cartService.getSubTotal();

    this.Direccion = '';

    this.formularioReactive();
    this.listaDirecciones();
    this.listaMetodoPagos();

    //Obtener los items del carrito de compras
    let itemsCarrito = this.cartService.getItems;
    //Armar la estructura de la tabla intermedia

    this.detalles = [];
    for (let index = 0; index < itemsCarrito.length; index++) {
      let p;
      this.gService
        .get('producto', itemsCarrito[index].producto.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          p = data;
          if (itemsCarrito[index].Cantidad <= p.Cantidad) {
            this.detalles[index] = {
              ProductoId: itemsCarrito[index].idItem,
              Cantidad: itemsCarrito[index].Cantidad,
              Subtotal: itemsCarrito[index].subtotal,
            };
          } else {
            this.noti.mensaje(
              'Orden',
              'Se ha excedido la cantidad disponible del producto: ' +
                p.Nombre +
                '. Se trató de añadir ' +
                itemsCarrito[index].Cantidad +
                ' de los cuales hay ' +
                p.Cantidad +
                ' disponibles.',
              TipoMessage.warning
            );

            itemsCarrito[index].Cantidad = parseInt(p.cantidad);
            this.cartService.addToCart(p);
            this.detalles[index] = {
              ProductoId: itemsCarrito[index].idItem,
              Cantidad: p.Cantidad,
              Subtotal: itemsCarrito[index].subtotal,
            };
          }
        });
    }
  }

  registrarOrden() {
    if (this.cartService.getItems != null) {
      
      //let detalles = itemsCarrito.map((x) => ({
      //  ['ProductoId']: x.idItem,
      //  ['Cantidad']: x.cantidad,
      //}));

      //Datos para el API
      let infoCompra = {
        ClienteId: this.currentUser.user.id,
        DireccionId: this.compraForm.value.DireccionId,
        MetodoPagoId: this.compraForm.value.MetodoPagoId,
        CompraDetalle: this.detalles,
        Subtotal: this.subtotal,
        Total: this.total,
      };

      console.log(infoCompra);

      this.gService.create('Compra', infoCompra).subscribe((respuesta: any) => {
        this.noti.mensaje(
          'Orden',
          'Orden registrada #' + respuesta.id,
          TipoMessage.success
        );
        this.cartService.deleteCart();
        this.total = this.cartService.getSubTotal();
        this.router.navigate(['/compra/' + respuesta.id]);
      });
    } else {
      this.router.navigate(['/producto/']);
      this.noti.mensaje(
        'Orden',
        'Agregue Productos a la orden',
        TipoMessage.warning
      );
    }
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.compraForm = this.fb.group({
      id: [null, null],

      clienteId: [null, Validators.required],
      DireccionId: [null, Validators.required],
      MetodoPagoId: [null, Validators.required],
      Subtotal: [null, Validators.required],
      Total: [false, Validators.required],
      DetalleProductos: [null, Validators.required],
      fotos: [null, Validators.required],
    });
  }
  public errorHandling = (control: string, error: string) => {
    return this.compraForm.controls[control].hasError(error);
  };

  listaDirecciones() {
    console.log(this.currentUser.user.id);
    this.DireccionList = null;
    this.gService
      .get('direccion', parseInt(this.currentUser.user.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.DireccionList = data;
      });
  }

  listaMetodoPagos() {
    this.MetodoPagoList = null;
    this.gService
      .get('metodoPago', parseInt(this.currentUser.user.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.MetodoPagoList = data;
      });
  }

  mostrarDireccion(event) {
    let dir = this.DireccionList[event - 1];
    this.Direccion =
      dir.Provincia +
      ', ' +
      dir.Canton +
      ', ' +
      dir.Distrito +
      '.\n' +
      dir.Detalle +
      '\n';
  }
}
