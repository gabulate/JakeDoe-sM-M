const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado por producto
module.exports.getByProducto = async (request, response, next) => {
    let idProducto = parseInt(request.params.id);
  
    const mensajes = await prisma.mensaje.findMany({
      where: { 
        ProductoId: idProducto,
       },
      orderBy: {
        id: "asc",
      },
    });
    response.json(mensajes);
  };