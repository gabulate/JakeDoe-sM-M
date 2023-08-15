const { PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const tipoPagos = await prisma.tipoPago.findMany({
        orderBy: {
            id: "asc",
          },
    });
    response.json(tipoPagos);
  };

  module.exports.getById = async (request, response, next) =>{
    let id = parseInt(request.params.id);
    const tipoPago= await prisma.tipoPago.findUnique({
        where:{id:id},
    });
    response.json(tipoPago);
  }