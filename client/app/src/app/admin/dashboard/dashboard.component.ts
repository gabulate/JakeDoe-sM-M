import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  productoColumns = ['foto', 'nombre', 'ventas'];

  VentasHoy: any = 13;
  MasVendidos: any[];
  Vendedores: any[];
  MejoresVendedores: any[];
  PeoresVendedores: any[];

  constructor(private gService: GenericService) {}

  ngOnInit(): void {
    this.cantidadVentas();
    this.listMasVendidos();
    this.listVendedores();
  }

  listMasVendidos() {
    this.gService
      .list('reporte/topProductos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Mas Vendidos',data);
        this.MasVendidos = data;
        this.MasVendidos = this.MasVendidos.slice(0, 5);
      });
  }

  listVendedores() {
    this.listMejoresVendedores();
    this.listPeoresVendedores();
  }

  listMejoresVendedores() {}

  listPeoresVendedores() {}

  cantidadVentas() {
    this.gService
      .list('reporte/ventasHoy')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Ventas Hoy', data);
        this.VentasHoy = data.VentasHoy;
      });
  }
}
