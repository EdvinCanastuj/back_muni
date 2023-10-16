import { Router } from "express";
import { methods as articulocontroller } from "./../controllers/articulos.controllers";


const router=Router();
router.get("/", articulocontroller.getArticulos);
router.get("/:id_articulo", articulocontroller.getArticulo);
router.post("/", articulocontroller.addArticulo);
router.delete("/:id_articulo", articulocontroller.deleteArticulo);
router.put("/:id_articulo", articulocontroller.updateArticulo);
router.get("/", articulocontroller.getArticulos);
router.get("/articulo/:id_usuario", articulocontroller.getArticuloU);
export default router;