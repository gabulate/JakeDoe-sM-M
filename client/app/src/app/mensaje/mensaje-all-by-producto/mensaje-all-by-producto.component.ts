import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-mensaje-all-by-producto',
  templateUrl: './mensaje-all-by-producto.component.html',
  styleUrls: ['./mensaje-all-by-producto.component.css']
})
export class MensajeAllByProductoComponent {
  datos: any;
  datosMensaje: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  listaFotos: any[] = [];
  //preguntaForm: FormGroup;
  preguntaForms: FormGroup[]=[];
  submitted = false;
  respMensaje: any;
  productoId: any;
  //clienteId=1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private sanitizer: DomSanitizer,
    private authService:AuthenticationService
  ) {
    this.formularioReactive();
    
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      console.log("id es " + id);
      this.productoId= Number(id);
      this.obtenerProducto(Number(id));
      this.listarMensajes(Number(id));
    }
    
  }

  obtenerProducto(id: any) {
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }

   listarMensajes(id: number) {
    this.gService
      .list(`mensaje/producto/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data); 
        this.datosMensaje = data.filter
        (item => item.Respuesta === null || item.Respuesta === '');
        if(this.datosMensaje && this.datosMensaje.length >0){
          this.crearFormulariosMensajes();
          
        }else{
          console.log("datos en datosMensaje no son válidos");
        }
      });
  } 

  crearFormulariosMensajes(){
    //Crear un formulario para cada pregunta en los datos obtenidos
    this.datosMensaje.forEach(item => {
      const preguntaForm =this.fb.group({
        mensajeId: Number([item.id]),
        productoId: Number([item.ProductoId]),
        clienteId:Number ([item.ClienteId]),
        pregunta:[item.Pregunta],
        respuesta:[null,Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])]
      });
      console.log(preguntaForm);
      this.preguntaForms.push(preguntaForm);
    });
  }
  formularioReactive() {
    this.preguntaForms=[];
  } 

  crearRespuesta(i:number){
    this.submitted = true;
    const preguntaForm= this.preguntaForms[i];
    if(isNaN(preguntaForm.value.mensajeId)){
      console.log("mensajeId es NaN");
    }
    
    console.log(preguntaForm.value);
    this.gService.update('mensaje',preguntaForm.value)
    .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.respMensaje=data;
      console.log(this.respMensaje);

      this.router.navigate(['/producto/' + this.productoId], {
        queryParams: { update: 'true' },
      });
    },
    (error:any)=>{
      console.error(error);
    }
    );


  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

