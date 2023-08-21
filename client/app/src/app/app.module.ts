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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PedidoModule } from './compra/compra.module';
import { MensajeModule } from './mensaje/mensaje.module';
import { FacturacionModule } from './facturacion/facturacion.module';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import { AdminModule } from './admin/admin.module';


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
    AdminModule,
    UserModule,
    PedidoModule,
    MensajeModule,
    ProductoModule,
    FacturacionModule,
    AppRoutingModule
  ],
  providers: [
/*     { 
    provide: HTTP_INTERCEPTORS, 
    useClass: HttpErrorInterceptorService, 
     multi: true 
  }  */
],
  bootstrap: [AppComponent]
})
export class AppModule { }
