import {Inject, Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CompraByClienteComponent } from 'src/app/compra/compra-by-cliente/compra-by-cliente.component';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-evaluacion-create',
  templateUrl: './evaluacion-create.component.html',
  styleUrls: ['./evaluacion-create.component.css']
})
export class EvaluacionCreateComponent implements OnInit{
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosDialog:any;

  stars: string[] = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialogRef:MatDialogRef<CompraByClienteComponent>,
    private authService: AuthenticationService,
  ) {
    this.datosDialog=data;
  }
  ngOnInit(): void {
/*     if(this.datosDialog.id){
      this.getUsuario(this.datosDialog.id);
      console.log("aja ", this.usuario);
    } */
    
  }
  changeIcon(index: number) {
    this.stars = this.stars.map((star, i) => (i < index ? 'star_rate' : 'star_border'));
  }

  keepIcon(index: number) {
    this.stars = this.stars.map((star, i) => (i <= index - 1 ? 'star_rate' : 'star_border'));
  }




  close(){
    this.dialogRef.close();
  }
}
