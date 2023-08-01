const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

//Controlador con las acciones de las rutas
const productoController = require("../controllers/ProductoController");

//Rutas de Producto

router.get("/", productoController.get);

router.post("/", upload.array("fotos", 5), productoController.create);

router.put("/:id", upload.array("fotos", 5), productoController.update);

router.get("/:id", productoController.getById);

router.get("/vendedor/:id", productoController.getByVendedor);
module.exports = router;
