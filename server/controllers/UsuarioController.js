const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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

  //Salt es una cadena aleatoria.
  //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
  // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
  let salt = bcrypt.genSaltSync(10);

  // Hash password
  let hash = bcrypt.hashSync(usuario.Contrasenna, salt);

  const selectedRoleIds = usuario.RolesSeleccionados; // Arreglo de los identificadores de los roles seleccionados por el usuario

  try {
    const newUsuario = await prisma.usuario.create({
      data: {
        Nombre: usuario.Nombre,
        Apellido: usuario.Apellido,
        Telefono: usuario.Telefono,
        Email: usuario.Email,
        Contrasenna: hash, //Se guarda la contraseña encriptada
        Calificacion: "5", //5 por defecto

        Roles: {
          create: selectedRoleIds.map((RolId) => ({
            rol: {
              connect: {
                id: RolId,
              },
            },
          })),
        },
      },
    });
    response.status(201).json({
      success: true,
      message: "Usuario creado",
      data: newUsuario,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al crear el usuario." });
  }
};

///////////////////////////////////////////////////////7
//HAY QUE CAMBIARLO NO SIRVE ASÍ COMO ESTÁ 
//LUEGO LO HAGO, SON LA 1:24 TENGO SUEÑO
//////////////////////////////////////////////////////
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let usuario = request.body;
  let idUsuario = parseInt(request.params.id);

  let salt = bcrypt.genSaltSync(10);

  let hash;
  //Verifica si el usuario quiere cambiar la contraseña y hashea la nueva contraseña,
  //si no, utiliza la vieja
  if (usuario.ContrasennaNueva) {
    hash = bcrypt.hashSync(usuario.ContrasennaNueva, salt);
  } else {
    hash = bcrypt.hashSync(usuario.Contrasenna, salt);
  }

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

  //Verificar que el usuario exista
  if (!usuarioViejo) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }

  //Verifica que la contraseña actual coincida por la dada por el usuario
  const checkPassword = await bcrypt.compare(
    usuarioViejo.Contrasenna,
    usuario.password
  );
  if (checkPassword === false) {
    response.status(401).send({
      success: false,
      message: "Credenciales no validas",
    });
  } else {
  }

  const newUsuario = await prisma.usuario.update({
    where: {
      id: idUsuario,
    },
    data: {
      Nombre: usuario.Nombre,
      Apellido: usuario.Apellido,
      Telefono: usuario.Telefono,
      Email: usuario.Email,
      Contrasenna: hash, //Envía la contraseña encriptada
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

module.exports.login = async (request, response, next) => {
  let usuarioReq = request.body;
  //Buscar el usuario según el email dado
  const usuario = await prisma.usuario.findUnique({
    where: {
      Email: usuarioReq.Email,
    },
  });
  //Sino lo encuentra según su email
  if (!usuario) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
  //Verifica la contraseña
  const checkPassword = await bcrypt.compare(
    usuarioReq.Contrasenna,
    usuario.Contrasenna
  );
  if (checkPassword === false) {
    response.status(401).send({
      success: false,
      message: "Credenciales no validas",
    });
  } else {
    //Usuario correcto
    //Crear el payload
    const payload = {
      Email: usuario.Email,
      Roles: usuario.Roles,
    };
    //Crear el token
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    response.json({
      success: true,
      message: "Usuario registrado",
      data: {
        user: usuario,
        token,
      },
    });
  }
};
