const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.getByUsuario = async (request, response, next) => {
  let UsuarioId = parseInt(request.params.id);

  const metodos = await prisma.metodoPago.findMany({
    where: {
      UsuarioId: UsuarioId,
    },
  });
  response.json(metodos);
};

module.exports.create = async (request, response, next) => {
  let metodo = request.body;
  const newMetodo = await prisma.metodoPago.create({
    data: {
      UsuarioId: metodo.UsuarioId,
      TipoPagoId: metodo.TipoPagoId,
      NumeroCuenta: metodo.NumeroCuenta,
      Expiracion: metodo.Expiracion,
      Titulo: metodo.Titulo,
    },
  });
  response.json(newMetodo);
};

module.exports.update = async (request, response, next) => {
  let metodo = request.body;
  let idMetodo = parseInt(request.params.id);

  //Obtener metodo viejo
  const metodoViejo = await prisma.metodoPago.findUnique({
    where: { id: idMetodo },
  });

  const newMetodo = await prisma.metodoPago.update({
    where: {
      id: idMetodo,
    },
    data: {
      UsuarioId: metodo.UsuarioId,
      TipoPagoId: metodo.TipoPagoId,
      NumeroCuenta: metodo.NumeroCuenta,
      Expiracion: metodo.Expiracion,
      Titulo: metodo.Titulo,
    },
  });
  response.json(newMetodo);
};
