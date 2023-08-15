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
  fecha = Date.now();
  destroy$: Subject<boolean> = new Subject<boolean>();
  qtyItems = 0;
  isAutenticated: boolean;
  currentUser: any;
  clienteId: any;

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
  ) {
    
  }

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

    this.Direccion = "hola"

    this.formularioReactive();
    this.listaDirecciones();
    this.listaMetodoPagos();
  }

  registrarOrden() {
    if (this.cartService.getItems != null) {
      //Obtener los items del carrito de compras
      let itemsCarrito = this.cartService.getItems;
      //Armar la estructura de la tabla intermedia

      let detalles = [];
      for (let index = 0; index < itemsCarrito.length; index++) {
        detalles[index] = {
          ProductoId: itemsCarrito[index].idItem,
          Cantidad: itemsCarrito[index].Cantidad,
          Subtotal: itemsCarrito[index].subtotal,
        };
      }

      //let detalles = itemsCarrito.map((x) => ({
      //  ['ProductoId']: x.idItem,
      //  ['Cantidad']: x.cantidad,
      //}));

      //Datos para el API
      let infoCompra = {
        ClienteId: this.currentUser.user.id,
        Fecha: new Date(this.fecha),
        CompraDetalles: detalles,
      };
      this.gService.create('Compra', infoCompra).subscribe((respuesta: any) => {
        this.noti.mensaje(
          'Orden',
          'Orden registrada #' + respuesta.id,
          TipoMessage.success
        );
        this.cartService.deleteCart();
        this.total = this.cartService.getTotal();
        console.log(respuesta);
      });
    } else {
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
    console.log(this.currentUser.user.id)
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

  mostrarDireccion(event){
    let dir = this.DireccionList[event - 1]
    this.Direccion = dir.Provincia + ', '+ dir.Canton + ', ' + dir.Distrito+ '.\n' + dir.Detalle + '\n';
  }
}
