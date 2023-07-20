const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const MetodoPagoController = require("../controllers/MetodoPagoController");

//router.get("/", MetodoPagoController.get);

router.post("/", MetodoPagoController.create);

router.get("/:id", MetodoPagoController.getByUsuario);

router.put("/:id", MetodoPagoController.update)

module.exports = router;