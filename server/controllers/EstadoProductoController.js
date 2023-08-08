const { PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const estadoProductos = await prisma.estadoProducto.findMany({
        orderBy: {
            id: "asc",
          },
    });
    response.json(estadoProductos);
  };

  module.exports.getById = async (request, response, next) =>{
    let id = parseInt(request.params.id);
    const estadoProducto= await prisma.estadoProducto.findUnique({
        where:{id:id},
    });
    response.json(estadoProducto);
  }