const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const productoController = require("../controllers/ProductoController");

//Rutas de Usuarios
router.get("/", productoController.get);

router.get("/:id", productoController.getById);

module.exports = router;
