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
//1
  await prisma.usuario.create({
    data: {
      Nombre: "Juan Carlos",
      Apellido: "Bodoque",
      Telefono: "8888 8888",
      Email: "juanbodoque@gmail.com", 
      Identificacion: "2 5630 6327",
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
//2
  await prisma.usuario.create({
    data: {
      Nombre: "Gabriel",
      Apellido: "Ulate",
      Telefono: "8888 8888",
      Email: "gulate@gmail.com",
      Identificacion: "2 0630 6934",
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
//3
  await prisma.usuario.create({
    data: {
      Nombre: "Melanny",
      Apellido: "Vargas",
      Telefono: "8888 8888",
      Email: "mvargas@gmail.com",
      Identificacion: "2 0808 0192",
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
//4
  await prisma.usuario.create({
    data: {
      Nombre: "Jane",
      Apellido: "Doe",
      NombreVendedor: "Jane Doe",
      Telefono: "8888 8888",
      Email: "jdoe@gmail.com",
      Identificacion: "1 0253 6948",
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
//5
  await prisma.usuario.create({
    data: {
      Nombre: "Jake",
      Apellido: "Doe",
      NombreVendedor: "Jake Doe",
      Telefono: "8888 8888",
      Email: "jakedoe@gmail.com",
      Identificacion: "1 0253 6948",
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

//6
await prisma.usuario.create({
  data: {
    Nombre: "Johnny",
    Apellido: "Dollar",
    Telefono: "8888 8888",
    Email: "johnydolar@gmail.com",
    Identificacion: "1 0253 6948",
    Contrasenna:
      "$2b$10$Qmee6hXHmLE3LQtyIZV5OuwBBhZNl.iyTikoQalubE50vULOdryli",
    Calificacion: "1",
    Roles: {
      createMany: {
        data: [{ RolId: 2 }],
      },
    },
    Deshabilitado: true,
  },
});
//7
await prisma.usuario.create({
data: {
  Nombre: "Carlota",
  Apellido: "Dulce",
  Telefono: "8888 8888",
  Email: "carlotadulce@gmail.com",
  Identificacion: "1 0253 6948",
  Contrasenna:
    "$2b$10$Qmee6hXHmLE3LQtyIZV5OuwBBhZNl.iyTikoQalubE50vULOdryli",
  Calificacion: "5",
  Roles: {
    createMany: {
      data: [{ RolId: 2 }],
    },
  },
  Deshabilitado: true,
},
});
//8
await prisma.usuario.create({
data: {
  Nombre: "Florencio",
  Apellido: "Aromático",
  NombreVendedor: "Fan de Floricienta forever",
  Telefono: "8888 8888",
  Email: "florencioaromatico@gmail.com",
  Identificacion: "1 0253 6948",
  Contrasenna:
    "$2b$10$Qmee6hXHmLE3LQtyIZV5OuwBBhZNl.iyTikoQalubE50vULOdryli",
  Calificacion: "1",
  Roles: {
    createMany: {
      data: [{ RolId: 3 }],
    },
  },
  Deshabilitado: true,
},
});
//9
await prisma.usuario.create({
data: {
  Nombre: "Estela",
  Apellido: "Infinita",
  NombreVendedor: "Forever Starlight",
  Telefono: "8888 8888",
  Email: "estelainfinita@gmail.com",
  Identificacion: "1 0253 6948",
  Contrasenna:
    "$2b$10$Qmee6hXHmLE3LQtyIZV5OuwBBhZNl.iyTikoQalubE50vULOdryli",
  Calificacion: "1",
  Roles: {
    createMany: {
      data: [{ RolId: 3 }],
    },
  },
  Deshabilitado: true,
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
