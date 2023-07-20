const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.getByUsuario = async (request, response, next) => {
  let UsuarioId = parseInt(request.params.id);

  const metodos = await prisma.direccion.findMany({
    where: {
      UsuarioId: UsuarioId,
    },
  });
  response.json(metodos);
};

module.exports.create = async (request, response, next) => {
  let direccion = request.body;
  const newDireccion = await prisma.direccion.create({
    data: {
      UsuarioId: direccion.UsuarioId,
      Provincia: direccion.Provincia,
      Canton: direccion.Canton,
      Distrito: direccion.Distrito,
      Detalle: direccion.Detalle,
      CodigoPostal: direccion.CodigoPostal,
      Telefono: direccion.Telefono,
      Titulo: direccion.Titulo,
    },
  });
  response.json(newDireccion);
};

module.exports.update = async (request, response, next) => {
  let metodo = request.body;
  let idDireccion = parseInt(request.params.id);

  //Obtener metodo viejo
  const direccionViejo = await prisma.direccion.findUnique({
    where: { id: idDireccion },
  });

  const newDireccion = await prisma.direccion.update({
    where: {
      id: idDireccion,
    },
    data: {
        UsuarioId: direccion.UsuarioId,
        Provincia: direccion.Provincia,
        Canton: direccion.Canton,
        Distrito: direccion.Distrito,
        Detalle: direccion.Detalle,
        CodigoPostal: direccion.CodigoPostal,
        Telefono: direccion.Telefono,
        Titulo: direccion.Titulo,
    },
  });
  response.json(newDireccion);
};
