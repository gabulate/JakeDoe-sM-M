const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      Nombre: "asc",
    },
    //Selecciona todos los campos MENOS el de la contraseña
    select: {
      id: true,
      Nombre: true,
      Apellido: true,
      Telefono: true,
      Email: true,
      Calificacion: true,
      Deshabilitado: true,
      Roles: {
        select: {
          rol: true
        },
      },
    },
  });
  response.json(usuarios);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const usuario = await prisma.usuario.findUnique({
    where: { id: id },
    //Selecciona todos los campos MENOS el de la contraseña
    select: {
      id: true,
      Nombre: true,
      Apellido: true,
      Telefono: true,
      Email: true,
      Calificacion: true,
      Deshabilitado: true,
      Roles: {
        select: {
          rol: true
        },
      },
      Direccion: true,
      MetodoPago: true,
    },
  });
  response.json(usuario);
};

//Crear un usuario
module.exports.create = async (request, response, next) => {};

//Actualizar un usuario
module.exports.update = async (request, response, next) => {};
