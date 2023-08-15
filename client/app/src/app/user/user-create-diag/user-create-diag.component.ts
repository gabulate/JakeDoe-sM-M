import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-user-create-diag',
  templateUrl: './user-create-diag.component.html',
  styleUrls: ['./user-create-diag.component.css']
})
export class UserCreateDiagComponent implements OnInit{

  usuarioId:number;
  usuario:any;
  datosDialog:any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialogRef:MatDialogRef<UserCreateDiagComponent>,
    private authService: AuthenticationService,
  ) {
    this.datosDialog=data;
  }
  ngOnInit(): void {
    if(this.datosDialog.id){
      this.getUsuario(this.datosDialog.id);
      console.log("aja ", this.usuario);
    }
    
  }
  continuarRegistro(){
    
      this.router.navigate(['/usuario/direccionpago', this.datosDialog.id],{
        relativeTo: this.route,
      });
      this.close();
  }

  detenerRegistro(){

  this.router.navigate(['usuario/login']);
    this.close();
  }

  getUsuario(id:number){
    this.gService
    .get('usuario', id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.usuario = data;
      console.log(this.usuario);
    });

   }
   close(){
    
    this.dialogRef.close();
  }
}
