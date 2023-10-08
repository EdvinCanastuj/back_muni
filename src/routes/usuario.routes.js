import { Router } from "express";
import { methods as usuarioController } from "./../controllers/usuario.controllers";


const router=Router();
router.get("/", usuarioController.getUsuarios);
router.get("/:id_usuario", usuarioController.getUsuario);
router.post("/", usuarioController.addUsuario);
router.delete("/:id_usuario", usuarioController.deleteUsuario);
router.put("/:id_usuario", usuarioController.updateUsuario);
export default router;