const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const evaluacionController = require("../controllers/EvaluacionController");
const productoController =require("../controllers/ProductoController")
//Rutas de Usuarios

router.post("/",evaluacionController.create);
router.get("/usuario/:id", evaluacionController.getByEvaluadoId);
router.get("/orden/:id", evaluacionController.getByIdOrden);
router.get("/orden/:idOrden/vendedor/:vendedorId", evaluacionController.getByIdOrdenAndVendedor);

module.exports = router;
