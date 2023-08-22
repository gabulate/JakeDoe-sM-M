const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.create = async (request, response, next) => {
    let evaluacion = request.body;
    const newEvaluacion = await prisma.evaluacion.create({
      data: {
       CompraId: parseInt(evaluacion.OrdenId),
       EvaluadorId: parseInt(evaluacion.EvaluadorId),
       EvaluadoId: parseInt(evaluacion.EvaluadoId),
       Calificacion: parseInt(evaluacion.Puntuacion),
       Comentario: evaluacion.Comentario,
      }, 
    });
    response.json(newEvaluacion); 
  }; 

  //obtener listado por Id de usuario evaluado
  module.exports.getByEvaluadoId = async (request, response, next) => {
    let EvaluadoId = parseInt(request.params.id);
  
    const evaluaciones = await prisma.evaluacion.findMany({
      where: {
        EvaluadoId: parseInt(EvaluadoId),
      },
    });
    response.json(evaluaciones);
  };

  module.exports.getByIdOrden = async (request, response, next) => {
    let OrdenId = parseInt(request.params.id);
  
    const evaluacion = await prisma.evaluacion.findMany({
      where: {
        CompraId: parseInt(OrdenId),
      },
    });
    response.json(evaluacion);
  };

  module.exports.getByIdOrdenAndVendedor = async (request, response, next) => {
    let OrdenId = parseInt(request.params.idOrden);
    let VendedorId = parseInt(request.params.vendedorId);
    const evaluacion = await prisma.evaluacion.findMany({
      where: {
        CompraId: parseInt(OrdenId),
        EvaluadoId: parseInt(VendedorId),
      },
    });
    response.json(evaluacion);
  };