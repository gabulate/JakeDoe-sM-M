const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      FotoProducto: true,

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
          Nombre: true,
          Apellido: true,
        },
      },
    },
  });
  response.json(productos);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.producto.findUnique({
    where: { id: id },
    include: {
      FotoProducto: true,
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
          Telefono: true,
          Email: true,
          Calificacion: true,
        },
      },
    },
  });
  response.json(producto);
};

//Crear un usuario
module.exports.create = async (request, response, next) => {};

//Actualizar un usuario
module.exports.update = async (request, response, next) => {};

//Obtener listado por vendedor
module.exports.getByVendedor = async (request, response, next) => {
  let idVendedor = parseInt(request.params.id);

  const productos = await prisma.producto.findMany({
    where: {
      VendedorId: idVendedor,
    },
    orderBy: {
      id: "asc",
    },
    include: {
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
    },
  });
  response.json(productos);
};
