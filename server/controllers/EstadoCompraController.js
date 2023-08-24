const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const estados = await prisma.estadoCompra.findMany({
  });
  response.json(estados);
};
