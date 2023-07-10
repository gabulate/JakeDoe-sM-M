const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const fotoController = require("../controllers/FotoProductoController");

//Rutas de Usuarios

router.get("/producto/:id", fotoController.getByProducto );


module.exports = router;
