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
  preguntaForm: FormGroup;
  submitted = false;
  respMensaje: any;
  productoId: any;
  //clienteId=1;
  usuarioId=1;
  
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
        this.datosMensaje = data;
      });
  }

  filtrarDatosMensaje(){
    return this.datosMensaje.filter(item => item.Respuesta === null || item.Respuesta === '');
  }

  formularioReactive() {
    //[null, Validators.required]
    this.preguntaForm=this.fb.group({
      id:[null,null],
      clienteId:[null,null],
      pregunta:[null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])]
    })
  }

  crearPregunta(){
    this.submitted = true;
    if(this.preguntaForm.invalid){
      return;
    }
    this.preguntaForm.patchValue({
      id: this.productoId,
      clienteId:1
    });
    console.log(this.preguntaForm.value);
    this.gService.create('mensaje',this.preguntaForm.value)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((data: any) => {
      this.respMensaje=data;
      /* this.router.navigate(['/producto', this.productoId], {
        queryParams: {update:'true'}
      }); */
    });
    this.listarMensajes(this.productoId);
    this.preguntaForm.reset();
  }

//let ClienteId= this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
  onReset() {
    this.submitted = false;
    this.preguntaForm.reset();
  }
  onBack(){
      this.router.navigate(
        ['/producto', this.productoId], 
        {state:{datos:this.datos}}
      );
    }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
