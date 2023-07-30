const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const mensajeController = require("../controllers/MensajeController");
const productoController =require("../controllers/ProductoController")
//Rutas de Usuarios

router.post("/",mensajeController.create);
router.get("/producto/:id", mensajeController.getByProducto);
router.get("/producto/vendedor/:id", productoController.getByVendedor);

module.exports = router;
