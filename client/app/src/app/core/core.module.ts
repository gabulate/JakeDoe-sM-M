import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {
  ButtonModule,
  CollapseModule,
  DropdownModule,
  GridModule,
  NavModule,
  NavbarModule,
} from '@coreui/angular';

import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    NavbarModule,
    GridModule,
    NavModule,
    CollapseModule,
    DropdownModule,
    ButtonModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
