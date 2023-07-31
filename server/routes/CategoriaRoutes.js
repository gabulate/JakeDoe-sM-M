const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const CategoriaController = require("../controllers/CategoriaController");

//router.get("/", MetodoPagoController.get);

router.get("/", CategoriaController.get);

module.exports = router;