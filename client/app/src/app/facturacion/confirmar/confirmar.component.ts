import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent {

// BAJO CONSTRUCCIÓN
//luego lo termino >.<

  /* registrarOrden() {
    if (this.cartService.getItems != null) {
      //Obtener los items del carrito de compras
      let itemsCarrito = this.cartService.getItems;
      //Armar la estructura de la tabla intermedia

      let detalles = [];
      for (let index = 0; index < itemsCarrito.length; index++) {
        detalles[index] = {
          ProductoId: itemsCarrito[index].idItem,
          Cantidad: itemsCarrito[index].cantidad,
          Subtotal: itemsCarrito[index].subtotal,
        }
      }

      //let detalles = itemsCarrito.map((x) => ({
      //  ['ProductoId']: x.idItem,
      //  ['Cantidad']: x.cantidad,
      //})); 

      
      //Datos para el API
      let infoCompra = {
        ClienteId: this.currentUser.user.id,
        Fecha: new Date(this.fecha),
        CompraDetalles: detalles,
      };
      this.gService.create('Compra', infoCompra).subscribe((respuesta: any) => {
        this.noti.mensaje(
          'Orden',
          'Orden registrada #' + respuesta.id,
          TipoMessage.success
        );
        this.cartService.deleteCart();
        this.total = this.cartService.getTotal();
        console.log(respuesta);
      });
    } else {
      this.noti.mensaje(
        'Orden',
        'Agregue Productos a la orden',
        TipoMessage.warning
      );
    }
  } */
}
