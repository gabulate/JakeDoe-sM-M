import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { ProductoModule } from './producto/producto.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { PedidoModule } from './compra/compra.module';
import { MensajeModule } from './mensaje/mensaje.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    PedidoModule,
    ProductoModule,

    AppRoutingModule,
      MensajeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
