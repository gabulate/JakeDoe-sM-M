import { PrismaClient } from "@prisma/client";
import fs from "fs"; //sirve para leer el contenido de un archivo de imagen en bytes y luego se almacena en la base de datos.

import { Roles } from "./seeds/Rol";
import { Categorias } from "./seeds/Categoria";
import { EstadoProductos } from "./seeds/EstadoProducto";
import { EstadoCompras } from "./seeds/EstadoCompra";
import { TipoPagos } from "./seeds/TipoPago";
//import { Usuarios } from "./seeds/Usuario";
import { Direcciones } from "./seeds/Direccion";
import { MetodoPago } from "./seeds/MetodoPago";
import { Productos } from "./seeds/Producto";
import { Compras } from "./seeds/Compra";
import { CompraDetalles } from "./seeds/CompraDetalle";
import { Mensajes } from "./seeds/Mensaje";
import { FotoProductos } from "./seeds/FotoProducto";

const prisma = new PrismaClient();

async function main() {
  await prisma.rol.createMany({
    data: Roles,
  });

  await prisma.usuario.create({
    data: {
      Nombre: "Juan Carlos",
      Apellido: "Bodoque",
      Telefono: "8888 8888",
      Email: "juanbodoque@gmail.com",
      Contrasenna:
        "$2b$10$Qmee6hXHmLE3LQtyIZV5OuwBBhZNl.iyTikoQalubE50vULOdryli",
      Calificacion: "0",
      Roles: {
        createMany: {
          data: [{ RolId: 2 }],
        },
      },
    },
  });

  await prisma.usuario.create({
    data: {
      Nombre: "Gabriel",
      Apellido: "Ulate",
      Telefono: "8888 8888",
      Email: "gulate@gmail.com",
      Contrasenna:
        "$2b$10$Qmee6hXHmLE3LQtyIZV5OuwBBhZNl.iyTikoQalubE50vULOdryli",
      Calificacion: "5",
      Roles: {
        createMany: {
          data: [{ RolId: 1 }],
        },
      },
    },
  });

  await prisma.usuario.create({
    data: {
      Nombre: "Melanny",
      Apellido: "Vargas",
      Telefono: "8888 8888",
      Email: "mvargas@gmail.com",
      Contrasenna:
        "$2b$10$Qmee6hXHmLE3LQtyIZV5OuwBBhZNl.iyTikoQalubE50vULOdryli",
      Calificacion: "5",
      Roles: {
        createMany: {
          data: [{ RolId: 1 }],
        },
      },
    },
  });

  await prisma.usuario.create({
    data: {
      Nombre: "Jane",
      Apellido: "Doe",
      Telefono: "8888 8888",
      Email: "jdoe@gmail.com",
      Contrasenna:
        "$2b$10$Qmee6hXHmLE3LQtyIZV5OuwBBhZNl.iyTikoQalubE50vULOdryli",
      Calificacion: "3",
      Roles: {
        createMany: {
          data: [{ RolId: 2 }, { RolId: 3 }],
        },
      },
    },
  });

  await prisma.usuario.create({
    data: {
      Nombre: "Jake",
      Apellido: "Doe",
      Telefono: "8888 8888",
      Email: "jakedoe@gmail.com",
      Contrasenna:
        "$2b$10$Qmee6hXHmLE3LQtyIZV5OuwBBhZNl.iyTikoQalubE50vULOdryli",
      Calificacion: "4",
      Roles: {
        createMany: {
          data: [{ RolId: 2 }, { RolId: 3 }],
        },
      },
    },
  });

  /*await prisma.usuario.createMany({
    data: Usuarios,
  });
 */

  await prisma.categoria.createMany({
    data: Categorias,
  });

  await prisma.estadoProducto.createMany({
    data: EstadoProductos,
  });

  await prisma.estadoCompra.createMany({
    data: EstadoCompras,
  });

  await prisma.tipoPago.createMany({
    data: TipoPagos,
  });

  await prisma.direccion.createMany({
    data: Direcciones,
  });

  await prisma.metodoPago.createMany({
    data: MetodoPago,
  });

  await prisma.producto.createMany({
    data: Productos,
  });

  await prisma.compra.createMany({
    data: Compras,
  });
  /* 
  await prisma.fotoProducto.createMany({
    data: FotoProductos,
  }); */

  //TUVE QUE HACERLO CON UN FOR, SI NO ME DA ERROR Y NO TENGO IDEA POR QUÉ
  //TE ODIO PRISMA
  for (let index = 0; index < FotoProductos.length; index++) {
    try {
      await prisma.fotoProducto.create({
        data: {
          ProductoId: FotoProductos[index].ProductoId,
          Foto: FotoProductos[index].Foto,
        },
      });
    } catch(e) {
      console.log(e);
      console.log("Error al insertar la imagen:");
      console.log(index);
    }
  }

  await prisma.compraDetalle.createMany({
    data: CompraDetalles,
  });

  await prisma.mensaje.createMany({
    data: Mensajes,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
