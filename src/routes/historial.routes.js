import { Router } from "express";
import { methods as historialcontroller } from "./../controllers/historial.controllers";


const router=Router();
router.get("/", historialcontroller.getHistorial);
router.get("/:id_articulo", historialcontroller.getHistoriaArticulo);

export default router;