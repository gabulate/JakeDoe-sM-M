import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import Chart from 'chart.js/auto';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
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
  Vendedores: any[];
  MejoresVendedores: any[];
  PeoresVendedores: any[];

  constructor(private gService: GenericService) {}

  ngOnInit(): void {
    this.cantidadVentas();
    this.listMasVendidos();
    this.listVendedores();
    this.inicioGrafico();
  }

  listVendedores() {
    this.gService
      .list('reporte/vendedores')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Vendedores', data);
        this.MejoresVendedores = data.slice(0, 5);
        this.PeoresVendedores = data
          .sort((a, b) => a.Calificacion - b.Calificacion)
          .slice(0, 5);
      });
  }

  listMasVendidos() {
    this.gService
      .list('reporte/topProductos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Mas Vendidos', data);
        this.MasVendidos = data;
        this.MasVendidos = this.MasVendidos.slice(0, 5);
      });
  }

  cantidadVentas() {
    this.gService
      .list('reporte/ventasHoy')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Ventas Hoy', data);
        this.VentasHoy = data.VentasHoy;
      });
  }

  inicioGrafico() {
    //Obtener datos del API
    this.gService
      .list('reporte/calificaciones')
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
