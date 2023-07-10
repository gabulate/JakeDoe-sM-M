import {Component,Inject,OnInit,ViewChild,} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit{

  datos: any;
  datosMensaje:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  listaFotos: any[]=[];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    if(!isNaN(Number(id))){
      this.obtenerProducto(Number(id));
      this.listarMensajes(Number(id));
      this.obtenerFotosProducto(Number(id));
    }
  }
  
  obtenerProducto(id:any){
    this.gService
    .get('producto',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
    });
  }

  listarMensajes(id: number){
    this.gService.list(`mensaje/producto/${id}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.datosMensaje=data
    })
  }

  obtenerFotosProducto(id:number){
    this.gService.list(`fotoProducto/producto/${id}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any) =>{
      console.log(data);
      this.listaFotos = data; 
    });
  } 

/*   getImageUrl(image) {
    console.log(image);
    let binary = '';
    const bytes = new Uint8Array(image);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Image = window.btoa(binary);
    const imageUrl = 'data:image/jpeg;base64,' + base64Image;
    
    const prueba = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    console.log(prueba);
    return prueba;
  }*/

 
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
