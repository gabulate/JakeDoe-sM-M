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
      NombreVendedor: true,
      Telefono: true,
      Email: true,
      Identificacion: true,
      Calificacion: true,
      Deshabilitado: true,
      //Contrasenna: true,
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
      NombreVendedor: true,
      Telefono: true,
      Email: true,
      Identificacion: true,
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
  let salt = bcrypt.genSaltSync(10);
  // Hash password
  let hash = bcrypt.hashSync(usuario.password, salt);
  const selectedRoleIds = usuario.rolesSeleccionados; // Arreglo de los identificadores de los roles seleccionados por el usuario
  if(usuario.NombreVendedor !== null){
    try {
      const newUsuario = await prisma.usuario.create({
        
        data: {
          Nombre: usuario.nombre,
          Apellido: usuario.apellido,
          NombreVendedor: usuario.nombreVendedor,
          Telefono: usuario.telefono.toString(),
          Email: usuario.email,
          Identificacion: usuario.identificacion.toString(),
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
      if(error.code ==='P2002'){
        console.error('Error con el correo. constraint unique dando problemaas');
      }
      response
        .status(500)
        .json({ error: "Ha ocurrido un error al crear el usuario." });
    }
  }
  else{
    try {
      const newUsuario = await prisma.usuario.create({
        
        data: {
          Nombre: usuario.nombre,
          Apellido: usuario.apellido,
          Telefono: usuario.telefono,
          Email: usuario.email,
          Identificacion: usuario.identificacion,
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
      if(error.code ==='P2002'){
        console.error('Error con el correo. constraint unique dando problemaas');
      }
      response
        .status(500)
        .json({ error: "Ha ocurrido un error al crear el usuario." });
    }
  }
  

};

//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let usuario = request.body;
  let Email = usuario.Email;

  let salt = bcrypt.genSaltSync(10);

  let hash;
  //Verifica si el usuario quiere cambiar la contraseña y hashea la nueva contraseña,
  //si no, utiliza la vieja
  if (usuario.ContrasennaNueva) {
    hash = bcrypt.hashSync(usuario.ContrasennaNueva, salt);
  } else {
    hash = bcrypt.hashSync(usuario.Contrasenna, salt);
    usuario.ContrasennaNueva = usuario.Contrasenna;
  }

  //Obtener usuario viejo
  const usuarioViejo = await prisma.usuario.findUnique({
    where: { Email: Email },
    include: {
      Roles: true,
    },
  });

  //Verificar que el usuario exista
  if (!usuarioViejo) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
    return;
  }

  //Verifica que la contraseña actual coincida por la dada por el usuario
  const checkPassword = await bcrypt.compare(
    usuario.Contrasenna,
    usuarioViejo.Contrasenna
  );
  if (checkPassword === false) {
    response.status(401).send({
      success: false,
      message: "Credenciales no validas",
    });
  } else {
    try {
      const selectedRoleIds = usuario.RolesSeleccionados;

      //Elimina los roles que ya tiene
      await prisma.rolOnUsuario.deleteMany({
        where: { UsuarioId: usuarioViejo.id },
      });

      const newUsuario = await prisma.usuario.update({
        where: {
          Email: Email,
        },
        data: {
          Nombre: usuario.Nombre,
          Apellido: usuario.Apellido,
          NombreVendedor: usuario.NombreVendedor,
          Telefono: usuario.Telefono,
          Identificacion: usuario.Identificacion,
          Contrasenna: hash, //Envía la contraseña encriptada
          Calificacion: usuario.Calificacion,

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
        message: "Usuario actualizado.",
        data: newUsuario,
      });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: "Ha ocurrido un error al actualizar el usuario." });
    }
  }
};

module.exports.cambiarActivacion = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const usuarioOriginal = await prisma.usuario.findUnique({
    where: { id: id },
  });

  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: {
        id: id,
      },
      data: {
        Deshabilitado: usuarioOriginal.Deshabilitado ? false : true,
      },
    });

    response.json(usuarioActualizado);
  } catch (error) {
    response.status(500).json({
      status: false,
      message: "Error: " + error,
      data: error,
    });
  }
};

module.exports.login = async (request, response, next) => {
  try {
    let usuarioReq = request.body;
    //Buscar el usuario según el email dado
    const usuario = await prisma.usuario.findUnique({
      where: {
        Email: usuarioReq.email,
      },
      include: { Roles: true },
    });
    //Sino lo encuentra según su email
    if (!usuario) {
      response.status(401).send({
        success: false,
        message: "Usuario no registrado",
      });
      return;
    }
    //Verifica la contraseña
    const checkPassword = await bcrypt.compare(
      usuarioReq.password,
      usuario.Contrasenna
    );
    if (checkPassword === false) {
      response.status(401).send({
        success: false,
        message: "Credenciales no validas",
      });
      return;
    }
    //Verifica si está deshabilitado
    else if (usuario.Deshabilitado) {
      response.status(403).send({
        success: false,
        message: "Acceso denegado. Su cuenta está deshabilitada.",
      });
      return;
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
  } catch (error) {
    response.status(500).json({
      status: false,
      message: "Error: " + error,
      data: error,
    });
  }
};
