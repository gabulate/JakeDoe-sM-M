const { PrismaClient, Prisma } = require("@prisma/client");
const { readFileSync } = require("fs");
const prisma = new PrismaClient();

module.exports.topVendidos = async (request, response, next) => {
  try {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT
      P.Nombre AS Nombre,
      COUNT(CD.id) AS Ventas,
      FP.Foto AS FotoProducto
      FROM Producto AS P
      LEFT JOIN CompraDetalle AS CD ON CD.ProductoId = P.id
      LEFT JOIN Compra AS C ON CD.CompraId = C.id
      LEFT JOIN FotoProducto AS FP ON P.id = FP.ProductoId
      WHERE P.Borrado = 0
      AND MONTH(C.Fecha) = MONTH(CURRENT_DATE()) AND YEAR(C.Fecha) = YEAR(CURRENT_DATE())
      GROUP BY P.id
      ORDER BY Ventas DESC;`
    );
    const convertedResult = result.map((item) => ({
      ...item,
      Ventas: item.Ventas.toString(),
    }));

    response.json(convertedResult);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al traer los datos." });
  }
};

module.exports.topVendidosVendedor = async (request, response, next) => {
  try {
    let idVendedor = parseInt(request.params.id);
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT
      P.Nombre AS Nombre,
      COUNT(CD.id) AS Ventas,
      FP.Foto AS FotoProducto
      FROM Producto AS P
      LEFT JOIN CompraDetalle AS CD ON CD.ProductoId = P.id
      LEFT JOIN Compra AS C ON CD.CompraId = C.id
      LEFT JOIN FotoProducto AS FP ON P.id = FP.ProductoId
      WHERE P.Borrado = 0
      AND MONTH(C.Fecha) = MONTH(CURRENT_DATE()) AND YEAR(C.Fecha) = YEAR(CURRENT_DATE())
      AND P.VendedorId = ${idVendedor}
      GROUP BY P.id
      ORDER BY Ventas DESC;`
    );
    const convertedResult = result.map((item) => ({
      ...item,
      Ventas: item.Ventas.toString(),
    }));

    response.json(convertedResult);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al traer los datos." });
  }
};

module.exports.vendedores = async (request, response, next) => {
  try {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT
      U.Nombre,
      U.Apellido,
      U.Calificacion,
      COUNT(C.id) AS VentasRealizadas
      FROM Usuario AS U
      LEFT JOIN Producto AS P ON U.id = P.VendedorId
      LEFT JOIN CompraDetalle AS CD ON P.id = CD.ProductoId
      LEFT JOIN Compra AS C ON CD.CompraId = C.id
      WHERE U.NombreVendedor IS NOT NULL
      AND U.Deshabilitado = false
      AND EXISTS (
      SELECT 1 FROM RolOnUsuario RU WHERE RU.UsuarioId = U.id AND RU.RolId = 3
      )
      GROUP BY U.id
      ORDER BY U.Calificacion DESC, VentasRealizadas DESC;`
    );

    const convertedResult = result.map((item) => ({
      Nombre: item.Nombre,
      Apellido: item.Apellido,
      Calificacion: item.Calificacion.toString(),
      VentasRealizadas: item.VentasRealizadas.toString(),
    }));

    response.json(convertedResult);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al traer los datos." });
  }
};

module.exports.ventasHoy = async (request, response, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer hora a las 00:00:00

    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT COUNT(id) AS VentasHoy
          FROM Compra
          WHERE Fecha >= ${today};`
    );

    const ventasHoyString = result[0].VentasHoy.toString();

    response.json({ VentasHoy: ventasHoyString });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al traer los datos." });
  }
};

module.exports.ventasHoyVendedor = async (request, response, next) => {
  try {
    let idVendedor = parseInt(request.params.id);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer hora a las 00:00:00

    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT COUNT(C.id) AS VentasHoy
          FROM Compra AS C
          JOIN CompraDetalle AS CD ON C.id = CD.CompraId
          JOIN Producto AS P ON CD.ProductoId = P.id
          WHERE C.Fecha >= ${today}
          AND P.VendedorId = ${idVendedor}`
    );

    const ventasHoyString = result[0].VentasHoy.toString();

    response.json({ VentasHoy: ventasHoyString });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al traer los datos." });
  }
};

module.exports.calificaciones = async (request, response, next) => {
  try {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT
      Calificacion,
      COUNT(*) AS CantidadEvaluaciones
      FROM Evaluacion
      WHERE Borrado = false
      GROUP BY Calificacion
      ORDER BY Calificacion DESC;`
    );

    const convertedResult = result.map(item => ({
      Calificacion: item.Calificacion.toString(),
      CantidadEvaluaciones: item.CantidadEvaluaciones.toString()
    }));

    response.json(convertedResult);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al traer los datos." });
  }
};

module.exports.calificacionesVendedor = async (request, response, next) => {
  try {
    let idVendedor = parseInt(request.params.id);
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT
      E.Calificacion,
      COUNT(*) AS CantidadEvaluaciones
      FROM Evaluacion AS E
      JOIN Producto AS P ON E.CompraId = P.VendedorId
      WHERE E.Borrado = false
      AND P.VendedorId = ${idVendedor}
      GROUP BY E.Calificacion
      ORDER BY E.Calificacion DESC;`
    );

    const convertedResult = result.map(item => ({
      Calificacion: item.Calificacion.toString(),
      CantidadEvaluaciones: item.CantidadEvaluaciones.toString()
    }));

    response.json(convertedResult);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al traer los datos." });
  }
};