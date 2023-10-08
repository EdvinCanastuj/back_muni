import { Router } from "express";
import { methods as cargocontroller } from "./../controllers/cargo.controllers";


const router=Router();
router.get("/", cargocontroller.getCargos);
router.get("/:id_cargo", cargocontroller.getCargo);
router.post("/", cargocontroller.addCargo);
router.delete("/:id_cargo", cargocontroller.deleteCargo);
router.put("/:id_cargo", cargocontroller.updateCargo);
export default router;