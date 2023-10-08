import { Router } from "express";
import { methods as dependenciacontroller } from "./../controllers/dependencia.controllers";


const router=Router();
router.get("/", dependenciacontroller.getDependencias);
router.get("/:id_dependencia", dependenciacontroller.getDependencia);
router.post("/", dependenciacontroller.addDependencia);
router.delete("/:id_dependencia", dependenciacontroller.deleteDependencia);
router.put("/:id_dependencia", dependenciacontroller.updateDependencia);
export default router;