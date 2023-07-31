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
          id: true,
          Descripcion: true,
        },
      },
      estado: {
        select: {
          id: true,

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
          id: true,
          Descripcion: true,
        },
      },
      estado: {
        select: {
          id: true,

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

//Crear un producto
module.exports.create = async (request, response, next) => {
  try {
    let producto = request.body;
    const newProducto = await prisma.producto.create({
      data: {
        Nombre: producto.Nombre,
        Descripcion: producto.Descripcion,
        Precio: producto.Precio,
        Cantidad: producto.Cantidad,
        CategoriaId: producto.CategoriaId,
        EstadoId: producto.EstadoId,
        VendedorId: producto.VendedorId,
      },
    });
    response.status(201).json({
      success: true,
      message: "Producto creado",
      data: newProducto,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al crear el producto." });
  }
};

//Actualizar un producto
module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idProducto = parseInt(request.params.id);
  //Obtener videojuego viejo
  const productoViejo = await prisma.producto.findUnique({
    where: { id: idProducto },
  });

  //Elimina las fotos que ya tiene
  await prisma.FotoProducto.deleteMany({
    where: { ProductoId: idProducto },
  });

  const newProducto = await prisma.producto.update({
    where: {
      id: idProducto,
    },
    data: {
      Nombre: producto.Nombre,
      Descripcion: producto.Descripcion,
      Precio: producto.Precio,
      Cantidad: producto.Cantidad,
      CategoriaId: producto.CategoriaId,
      EstadoId: producto.EstadoId,
      VendedorId: producto.VendedorId,
      /* FotoProducto: {
        connect: producto.generos,
      }, */
    },
  });
  response.json(newProducto);
};

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
