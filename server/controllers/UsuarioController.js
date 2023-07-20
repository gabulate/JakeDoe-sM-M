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
          rol: true,
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
          rol: true,
        },
      },
      Direccion: true,
      MetodoPago: true,
    },
  });
  response.json(usuario);
};

//Crear un usuario
module.exports.create = async (request, response, next) => {
  let usuario = request.body;
  const newUsuario = await prisma.usuario.create({
    data: {
      Nombre: usuario.Nombre,
      Apellido: usuario.Apellido,
      Telefono: usuario.Telefono,
      Email: usuario.Email,
      Contrasenna: usuario.Contrasenna, //Encriptar lueeeego
      Calificacion: "5", //5 por defecto

      Roles: {
        //Roles tiene que ser {id:valor}
        // [{ id: 1 },{id: 3}]
        connect: usuario.Roles,
      },
    },
  });
  response.json(newUsuario);
};

//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let usuario = request.body;
  let idUsuario = parseInt(request.params.id);

  //Obtener usuario viejo
  const usuarioViejo = await prisma.usuario.findUnique({
    where: { id: idUsuario },
    include: {
      Roles: {
        select: {
          id: true,
        },
      },
    },
  });

  const newUsuario = await prisma.usuario.update({
    where: {
      id: idUsuario,
    },
    data: {
      Nombre: usuario.Nombre,
      Apellido: usuario.Apellido,
      Telefono: usuario.Telefono,
      Email: usuario.Email,
      Contrasenna: usuario.Contrasenna, //Encriptar lueeeego
      Calificacion: usuario.Calificacion, 

      Roles: {
        //Roles tiene que ser {id:valor}
        disconnect: usuarioViejo.Roles,
        connect: usuario.Roles,
      },
    },
  });
  response.json(newUsuario);
};
