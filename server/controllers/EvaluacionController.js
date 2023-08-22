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
      }, 
    });
    response.json(newEvaluacion); 
  }; 

  //obtener listado por Id de usuario evaluado
  module.exports.getByEvaluadoId = async (request, response, next) => {
    let EvaluadoId = parseInt(request.params.id);
  
    const evaluaciones = await prisma.evaluacion.findMany({
      where: {
        EvaluadoId: EvaluadoId,
      },
    });
    response.json(evaluaciones);
  };

  module.exports.getByIdOrden = async (request, response, next) => {
    let OrdenId = parseInt(request.params.id);
  
    const evaluacion = await prisma.evaluacion.findMany({
      where: {
        CompraId: OrdenId,
      },
    });
    response.json(evaluacion);
  };
