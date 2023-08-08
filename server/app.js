const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();

//---Archivos de rutas---
const usuarioRouter = require("./routes/UsuarioRoutes");
const productoRouter = require("./routes/ProductoRoutes");
const compraRouter = require("./routes/CompraRoutes");
const mensajeRouter = require("./routes/MensajeRoutes");
const fotoRouter = require("./routes/FotoProductoRoutes");
const metodoPagoRouter = require("./routes/MetodoPagoRoutes");
const direccionRouter = require("./routes/DireccionRoutes");
const categoriaRoutes = require("./routes/CategoriaRoutes");
const rolRoutes = require("./routes/RolRoutes");
// Acceder a la configuracion del archivo .env
dotEnv.config();

// Puerto que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;

// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());

// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));

// Middleware para gestionar Requests y Response json
app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

//---- Definir rutas ----
app.use("/usuario/", usuarioRouter);
app.use("/producto/", productoRouter);
app.use("/compra/", compraRouter);
app.use("/mensaje/", mensajeRouter);
app.use("/fotoProducto/", fotoRouter);
app.use("/metodoPago/", metodoPagoRouter);
app.use("/direccion/", direccionRouter);
app.use("/categoria/", categoriaRoutes);
app.use("/rol/", rolRoutes);

// Servidor
app.listen(port, () => {
  console.log("Jake Doe's store API is up and running! B^)");
  console.log(`Check here --> http://localhost:${port}`);
  console.log("Presione CTRL-C para deternerlo\n");
});
