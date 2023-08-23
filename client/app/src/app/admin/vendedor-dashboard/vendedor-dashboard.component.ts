import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import Chart from 'chart.js/auto';
import { GenericService } from 'src/app/share/generic.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-vendedor-dashboard',
  templateUrl: './vendedor-dashboard.component.html',
  styleUrls: ['./vendedor-dashboard.component.css']
})
export class VendedorDashboardComponent implements OnInit{
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any;
  //Canvas para el grafico
  canvas: any;
  //Contexto del Canvas
  ctx: any;
  //Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  //Establecer gráfico
  grafico: any;
  datosGrafico: any;

  productoColumns = ['foto', 'nombre', 'ventas'];
  vendedorColumns = ['nombre', 'calificacion', 'ventas'];

  VentasHoy: any = 0;
  MasVendidos: any[];

  constructor(private gService: GenericService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));

    this.cantidadVentas();
    this.listMasVendidos();
    this.inicioGrafico();
  }

  listMasVendidos() {
    this.gService
      .list('reporte/topProductos/' + this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Mas Vendidos', data);
        this.MasVendidos = data;
        this.MasVendidos = this.MasVendidos.slice(0, 5);
      });
  }

  cantidadVentas() {
    this.gService
      .list('reporte/ventasHoy/' + this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Ventas Hoy', data);
        this.VentasHoy = data.VentasHoy;
      });
  }

  inicioGrafico() {
    //Obtener datos del API
    this.gService
      .list('reporte/calificaciones/' + this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Calificaciones', data);
        this.datosGrafico = data;
        this.graficoBrowser();
      });
  }
  //Configurar y crear gráfico
  graficoBrowser(): void {
    this.canvas = this.graficoCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if (this.grafico) {
      this.grafico.destroy();
    }
    this.grafico = new Chart(this.ctx, {
      type: 'pie',
      data: {
        //Etiquetas debe ser un array
        labels: this.datosGrafico.map((x) => x.Calificacion + '/5'),
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            //Datos del grafico, debe ser un array
            data: this.datosGrafico.map((x) => x.CantidadEvaluaciones),
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
      },
    });
  }
}
