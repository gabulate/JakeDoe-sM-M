const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.getByUsuario = async (request, response, next) => {
  try {
    let UsuarioId = parseInt(request.params.id);

    const metodos = await prisma.direccion.findMany({
      where: {
        UsuarioId: UsuarioId,
      },
    });
    response.json(metodos);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al traer las direcciones." });
  }
};

module.exports.create = async (request, response, next) => {
  try{
    let direccion = request.body;
  const newDireccion = await prisma.direccion.create({
    data: {
      UsuarioId: direccion.usuarioId,
      Provincia: direccion.provincia,
      Canton: direccion.canton,
      Distrito: direccion.distrito,
      Detalle: direccion.detalle,
      CodigoPostal: direccion.codPostal.toString(),
      Telefono: direccion.telefono.toString(),
      Titulo: direccion.titulo,
    },
  });
  response.json(newDireccion);
  } catch(error){
    console.error(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al crear la dirección." });
  }
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
