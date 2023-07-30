const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const productoController = require("../controllers/ProductoController");

//Rutas de Producto
router.get("/", productoController.get);

router.get("/:id", productoController.getById);

router.get("/vendedor/:id", productoController.getByVendedor);

router.post("/", productoController.create);


module.exports = router;
