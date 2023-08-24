import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from 'src/app/share/generic.service';

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  apiUrl = environment.apiURL;
  destroy$: Subject<boolean> = new Subject<boolean>();
  user: any;
  constructor(private http: HttpClient, private gService: GenericService) {}

  getCalificacionesUsuario(userId: number): Observable<any> {
    return this.gService.get('evaluacion/usuario', userId);
  }
  
  calcularCalificacionPromedio(calificaciones: any[]): number {
    if (calificaciones.length === 0) {
      return 0;
    }
    const sumaPuntuaciones = calificaciones.reduce(
      (total, calificacion) => total + parseFloat(calificacion.Calificacion),
      0
    );
    return sumaPuntuaciones / calificaciones.length;
  }

  actualizarCalificacionPromedio(
    userId: number,
    promedio: number
  ): Observable<any> {
    this.gService
      .get('usuario', userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
        this.user.Calificacion = promedio.toString();

        this.gService
          .update('usuario/evaluacion', this.user)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log('calificación promediada actualizada con éxito ', data);
          });
      });
    return this.user;
  }
}
