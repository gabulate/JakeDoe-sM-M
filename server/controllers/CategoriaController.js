const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const categorias = await prisma.categoria.findMany({
  });
  response.json(categorias);
};
