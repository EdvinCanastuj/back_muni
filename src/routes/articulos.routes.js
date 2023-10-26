import { Router } from "express";
import { methods as articulocontroller } from "./../controllers/articulos.controllers";


const router=Router();
router.get("/", articulocontroller.getArticulos);
router.get("/art", articulocontroller.getArticulos2);
router.get("/qr/:id_usuario", articulocontroller.getArticuloQR);
router.get("/articulo/:id_usuario", articulocontroller.getArticuloU);
router.get("/qr", articulocontroller.getArticuloQRVer);
router.get("/:id_articulo", articulocontroller.getArticulo);
router.post("/", articulocontroller.addArticulo);
router.delete("/:id_articulo", articulocontroller.deleteArticulo);
router.put("/:id_articulo", articulocontroller.updateArticulo);
export default router;