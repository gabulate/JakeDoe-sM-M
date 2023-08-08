import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAutenticated: boolean;
  currentUser: any;
  clienteId: any;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
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
  }

  comprasCliente() {
    this.router.navigate(['/compra/cliente/' + this.currentUser.user.id]);
  }

  pedidosCliente() {
    this.router.navigate(['/pedido/vendedor/' + this.currentUser.user.id]);
  }

  proveedor() {
    this.router.navigate(['/admin/producto/']);
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

  login() {
    this.router.navigate(['usuario/login']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['inicio']);
  }
}
