const express = require("express");
const router = express.Router();

const tipoPagoController = require("../controllers/TipoPagoController");

router.get("/", tipoPagoController.get);
router.get("/:id", tipoPagoController.getById);

module.exports = router; 