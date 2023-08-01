import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAutenticated: boolean;
  currentUser: any;
  clienteId : any;
    constructor(
      private router: Router,
      private authService: AuthenticationService
    ){
      /* this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
      this.clienteId=this.currentUser.user.id;
      console.log("id usuario: "+ this.clienteId); */

    }

    ngOnInit():void{
      this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
      this.clienteId=this.currentUser.user.id;
      console.log(parseInt(this.currentUser.user.id));
      
    }

    comprasCliente(){
      this.router.navigate(['/compra/cliente', this.clienteId]);
    }



    login(){
      this.router.navigate(['usuario/login'])
    }
    logout(){
      this.authService.logout();
      this.router.navigate(['inicio'])
    }
}
