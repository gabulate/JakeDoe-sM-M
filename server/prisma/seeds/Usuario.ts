export const Usuarios = [
  //1
  {
    Nombre: "Juan Carlos",
    Apellido: "Bodoque",
    Telefono: "8888 8888",
    Email: "juanbodoque@gmail.com",
    Contrasenna: "bizcochito",
    Calificacion: "0",
    Roles: {
      createMany: {
        data: [{ RolId: 2 }],
      },
    },
  },
  //2
  {
    Nombre: "Gabriel",
    Apellido: "Ulate",
    Telefono: "8888 8888",
    Email: "gulate@gmail.com",
    Contrasenna: "bizcochito",
    Calificacion: "5",
    Roles: {
      createMany: {
        data: [{ RolId: 1 }],
      },
    },
  },
  //3
  {
    Nombre: "Melanny",
    Apellido: "Vargas",
    Telefono: "8888 8888",
    Email: "mvargas@gmail.com",
    Contrasenna: "bizcochito",
    Calificacion: "5",
    Roles: {
      createMany: {
        data: [{ RolId: 1 }],
      },
    },
  },
  //4
  {
    Nombre: "Jane",
    Apellido: "Doe",
    Telefono: "8888 8888",
    Email: "jdoe@gmail.com",
    Contrasenna: "bizcochito",
    Calificacion: "3",
    Roles: {
      createMany: {
        data: [{ RolId: 2 }, { RolId: 3 }],
      },
    },
  },
  //5
  {
    Nombre: "Jake",
    Apellido: "Doe",
    Telefono: "8888 8888",
    Email: "jakedoe@gmail.com",
    Contrasenna: "bizcochito",
    Calificacion: "4",
    Roles: {
      createMany: {
        data: [{ RolId: 2 }, { RolId: 3 }],
      },
    },
  },
];
