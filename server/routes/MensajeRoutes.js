const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const mensajeController = require("../controllers/MensajeController");

//Rutas de Usuarios

router.get("/producto/:id", mensajeController.getByProducto);


module.exports = router;
