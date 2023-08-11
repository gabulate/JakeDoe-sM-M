import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {  
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  isAutenticated: boolean;
  currentUser: any;
  clienteId: any;
  //Tabla
  displayedColumns: string[] = [
    'producto',
    'precio',
    'cantidad',
    'subtotal',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private route: ActivatedRoute,
    private gService: GenericService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void { 
    this.qtyItems=this.cartService.quantityItems();
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    this.clienteId = this.authService.UsuarioId;

    this.cartService.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.cartService.getTotal();
  }
  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
    this.cartService.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    /*  this.noti.mensaje('Orden',
    'Cantidad actualizada: '+item.cantidad,
    TipoMessage.info) */
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Orden', 'Producto eliminado.', TipoMessage.warning);
  }
  comprar() {
    if(this.qtyItems > 0){
      this.router.navigate(['/facturacion/confirmar'], {
        relativeTo: this.route,
      });
    } else {
    this.noti.mensaje('Orden', 'No hay productos a comprar.', TipoMessage.error);
    }
  }

  Productos(){
    this.router.navigate(['/producto'], {
      relativeTo: this.route,
    });
  }
}
