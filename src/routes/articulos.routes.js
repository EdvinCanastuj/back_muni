import { Router } from "express";
import { methods as articulocontroller } from "./../controllers/articulos.controllers";


const router=Router();
router.get("/", articulocontroller.getArticulos);
router.get("/usuario", articulocontroller.getArticulosUser);
router.get("/qr", articulocontroller.getQr);
router.get("/qr/:id_articulo", articulocontroller.getQrId)
router.get("/articulo/:id_articulo", articulocontroller.getArticulo);
router.get("/:id_articulo", articulocontroller.getArticulo);
router.post("/", articulocontroller.addArticulo);
router.delete("/:id_articulo", articulocontroller.deleteArticulo);
router.put("/:id_articulo", articulocontroller.updateArticulo);
router.get("/", articulocontroller.getArticulos);

export default router;