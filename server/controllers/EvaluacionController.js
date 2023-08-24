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
    try{
      const evaluaciones = await prisma.evaluacion.findMany({
        where: {
          EvaluadoId: parseInt(EvaluadoId),
        },
      });
      response.json(evaluaciones);
    
  } catch (error) {
    console.error('Error fetching calificaciones:', error);
    res.status(500).json({ error: 'Error fetching calificaciones' });
  }
}

module.exports.getByIdOrden = async (request, response, next) => {
  let OrdenId = parseInt(request.params.id);

  const evaluacion = await prisma.evaluacion.findMany({
    where: {
      CompraId: parseInt(OrdenId),
    },
  });
  response.json(evaluacion);
};

module.exports.getByIdOrdenAndEvaluado = async (request, response, next) => {
  try {
    let OrdenId = parseInt(request.params.idOrden);
    let EvaluadoId = parseInt(request.params.evaluadoId);
    const evaluacion = await prisma.evaluacion.findMany({
      where: {
        CompraId: parseInt(OrdenId),
        EvaluadoId: parseInt(EvaluadoId),
      },
    });
    response.json(evaluacion);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al traer los datos." });
  }
};
