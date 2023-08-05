import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ProductoDiagComponent } from '../producto-diag/producto-diag.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css'],
})
export class ProductoIndexComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  gridCols: number = 3;

  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    this.listarProductos();
    this.observeBreakpoints();
  }
  listarProductos() {
    this.gService
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  detalleProducto(id: number) {
    this.router.navigate(['/producto', id], {
      relativeTo: this.route,
    });
  }

  observeBreakpoints() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.gridCols = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.gridCols = 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.gridCols = 3;
        } else {
          this.gridCols = 4;
        }
      });
  }

  getImageUrl(image) {
    let binary = '';
    const bytes = new Uint8Array(image);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Image = window.btoa(binary);
    const imageUrl = 'data:image/jpeg;base64,' + base64Image;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
