import { Router } from "express";
import { methods as rolcontroller } from "./../controllers/rol.controllers";


const router=Router();
router.get("/", rolcontroller.getRol);

export default router;