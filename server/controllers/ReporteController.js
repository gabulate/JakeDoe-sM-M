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
        GROUP BY P.id
        ORDER BY Ventas DESC;`
    );
    const convertedResult = result.map(item => ({
        ...item,
        Ventas: item.Ventas.toString()
      }));
  
      response.json(convertedResult);
  } catch (error) {
    console.log(error)
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
