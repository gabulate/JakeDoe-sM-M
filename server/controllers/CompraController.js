const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const compras = await prisma.compra.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      cliente: {
        select: {
          id: true,
          Nombre: true,
          Apellido: true,
        },
      },
      Total: true,
      Fecha: true,
    },
  });
  response.json(compras);
};

//Obtener listado por vendedor
module.exports.getByVendedor = async (request, response, next) => {
  let idVendedor = parseInt(request.params.id);

  const compras = await prisma.compraDetalle.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      producto: {
        VendedorId: idVendedor,
      },
    },
    select: {
      id: true,
      compra: {
        select: {
          id: true,
          cliente: {
            select: {
              id: true,
              Nombre: true,
              Apellido: true,
            },
          },
          Total: true,
          Fecha: true,
        },
      },
      producto: true,
      Cantidad: true,
      Subtotal: true,
      estadoCompra: true,
    },
  });
  response.json(compras);
};

//Obtener DetalleCompra por Id
module.exports.getDetalleById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const compras = await prisma.compraDetalle.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      compra: {
        select: {
          id: true,
          cliente: {
            select: {
              id: true,
              Nombre: true,
              Apellido: true,
            },
          },
          Total: true,
          Fecha: true,
        },
      },
      producto: {
        select: {
          id: true,
          Nombre: true,
          Descripcion: true,
          Precio: true,
          categoria: {
            select: {
              Descripcion: true,
            },
          },
          estado: {
            select: {
              Descripcion: true,
            },
          },
          vendedor: {
            select: {
              id: true,
              Nombre: true,
              Apellido: true,
            },
          },
        },
      },
      Cantidad: true,
      Subtotal: true,
      estadoCompra: true,
    },
  });
  response.json(compras);
};

//Obtener listado por cliente
module.exports.getByCliente = async (request, response, next) => {
  let idCliente = parseInt(request.params.id);

  const compras = await prisma.compra.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      ClienteId: idCliente,
    },
    select: {
      id: true,
      cliente: {
        select: {
          id: true,
          Nombre: true,
          Apellido: true,
        },
      },
      Total: true,
      Fecha: true,
    },
  });
  response.json(compras);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const compra = await prisma.compra.findUnique({
    where: { id: id },
    select: {
      id: true,
      CompraDetalle: {
        select: {
          id: true,
          producto: {
            select: {
              FotoProducto: true,
              Nombre: true,
              categoria: {
                select: {
                  Descripcion: true,
                },
              },
              estado: {
                select: {
                  Descripcion: true,
                },
              },
              vendedor: {
                select: {
                  id: true,
                  Nombre: true,
                  Apellido: true,
                },
              },
              Precio: true,
            },
          },
          Cantidad: true,
          estadoCompra: {
            select: {
              id: true,
              Descripcion: true,
            },
          },
        },
      },
      cliente: {
        select: {
          Nombre: true,
          Apellido: true,
          Telefono: true,
          Email: true,
          Calificacion: true,
        },
      },
      direccion: {
        select: {
          id: true,
          Titulo: true,
          Provincia: true,
          Canton: true,
          Distrito: true,
          Detalle: true,
          CodigoPostal: true,
          Telefono: true,
        },
      },
      metodoPago: {
        select: {
          id: true,
          Titulo: true,
        },
      },
      Subtotal: true,
      Total: true,
      Fecha: true,
    },
  });
  response.json(compra);
};

//Crear un usuario
module.exports.create = async (request, response, next) => {};

//Actualizar un usuario
module.exports.update = async (request, response, next) => {};
