import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CartService } from 'src/app/share/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ProductoDiagComponent } from '../producto-diag/producto-diag.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css'],
})
export class ProductoIndexComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isAutenticated: boolean;
  currentUser: any;
  clienteId: any;
  gridCols: number = 3;

  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private notificacion: NotificacionService,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService
  ) {
    this.listarProductos();
    this.observeBreakpoints();

    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    this.clienteId = this.authService.UsuarioId;
    console.log('Cliente: ', this.currentUser.user.id);
  }
  listarProductos() {
    this.gService
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  detalleProducto(id: number) {
    this.router.navigate(['/producto', id], {
      relativeTo: this.route,
    });
  }

  observeBreakpoints() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.gridCols = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.gridCols = 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.gridCols = 3;
        } else {
          this.gridCols = 4;
        }
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
          console.log('CARRITO: ', this.cartService.getItems);
        });
    } catch {
      this.notificacion.mensaje(
        'Orden',
        'Ha ocurrido un error al añadir el producto al carrito :(.',
        TipoMessage.error
      );
    }
  }

  /* 
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
  } */
}
