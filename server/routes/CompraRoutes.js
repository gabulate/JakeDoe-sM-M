const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const compraController = require("../controllers/compraController");

//Rutas de Usuarios
router.get("/", compraController.get);

router.get("/:id", compraController.getById);

module.exports = router;
