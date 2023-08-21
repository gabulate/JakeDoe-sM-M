import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAutenticated: boolean;
  currentUser: any;
  clienteId: any;
  qtyItems: Number = 0;
  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.qtyItems = this.cartService.quantityItems();
    /* this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
      this.clienteId=this.currentUser.user.id;
      console.log("id usuario: "+ this.clienteId); */
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    this.clienteId = this.authService.UsuarioId;
    console.log('Cliente: ', this.currentUser.user.id);

    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value;
    });
  }

  comprasCliente() {
    this.router.navigate(['/compra/cliente/' + this.currentUser.user.id]);
  }

  pedidosCliente() {
    this.router.navigate(['/pedido/vendedor/' + this.currentUser.user.id]);
  }

  proveedor() {
    // this.router.navigate(['/admin/producto/']);
    this.router.navigate(['/producto/vendedor/' + this.currentUser.user.id]);
  }

  mensajes() {
    this.router.navigate([
      '/mensaje/producto/vendedor/' + this.currentUser.user.id,
    ]);
  }

  isVendedor() {
    let userRole = [];
    if (this.currentUser) {
      for (let index = 0; index < this.currentUser.user.Roles.length; index++) {
        userRole[index] = this.currentUser.user.Roles[index].RolId;
      }
    }

    for (let index = 0; index < userRole.length; index++) {
      if (userRole[index] === 3) {
        return true;
      }
    }
    return false;
  }

  isCliente() {
    let userRole = [];
    if (this.currentUser) {
      for (let index = 0; index < this.currentUser.user.Roles.length; index++) {
        userRole[index] = this.currentUser.user.Roles[index].RolId;
      }
    }

    for (let index = 0; index < userRole.length; index++) {
      if (userRole[index] === 2) {
        return true;
      }
    }
    return false;
  }

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
  }
  login() {
    this.router.navigate(['usuario/login']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['inicio']);
  }
  register(){
    this.router.navigate(['usuario/registrar']);
  }
  miCuenta(){
    this.router.navigate(['usuario/cuenta']);
  }
}
