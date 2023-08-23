const express = require("express");
const router = express.Router();
const multer = require("multer");

//Controlador con las acciones de las rutas
const reporteController = require("../controllers/ReporteController");

//Rutas de Producto

router.get("/topProductos", reporteController.topVendidos);
router.get("/topProductos/:id", reporteController.topVendidosVendedor);

router.get("/ventasHoy", reporteController.ventasHoy);
router.get("/ventasHoy/:id", reporteController.ventasHoyVendedor);

router.get("/vendedores", reporteController.vendedores);

router.get("/calificaciones", reporteController.calificaciones);
router.get("/calificaciones/:id", reporteController.calificacionesVendedor);

/* router.post("/", reporteController.create);

router.put("/:id", reporteController.update);

router.get("/:id", reporteController.getById);

router.get("/vendedor/:id", reporteController.getByVendedor); */
module.exports = router;
