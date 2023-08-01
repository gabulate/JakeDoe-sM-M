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
    constructor(
      private router: Router,
      private authService: AuthenticationService
    ){}

    ngOnInit():void{
      this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
      console.log(parseInt(this.currentUser.usuario.id));
      this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    }
    login(){
      this.router.navigate(['usuario/login'])
    }
    logout(){
      this.authService.logout();
      this.router.navigate(['inicio'])
    }
}
