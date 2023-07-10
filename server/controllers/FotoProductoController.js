const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado por producto
module.exports.getByProducto = async (request, response, next) => {
    let idProducto = parseInt(request.params.id);
  
    const fotos = await prisma.fotoProducto.findMany({
      where: { 
        ProductoId: idProducto,
       },
    });
    response.json(fotos);
  };