const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const compraController = require("../controllers/CompraController");

//Rutas de Usuarios
router.get("/", compraController.get);

router.post("/", compraController.create);

router.get("/:id", compraController.getById);

router.get("/detalle/:id", compraController.getDetalleById);

router.put("/detalle/:id", compraController.updateCompraDetallePedido);

router.get("/cliente/:id", compraController.getByCliente);

router.get("/vendedor/:id", compraController.getByVendedor);

router.get("/pedido/:id", compraController.getDetalleById);

module.exports = router;
