import { Router } from "express";
import { methods as usuarioController } from "./../controllers/usuario.controllers";


const router=Router();
router.get("/", usuarioController.getUsuarios);
router.get("/user/", usuarioController.getUsuarios1);
router.get("/responsable/", usuarioController.getResponsable);
router.get("/:id_usuario", usuarioController.getUsuario);
router.post("/", usuarioController.addUsuario);
router.delete("/:id_usuario", usuarioController.deleteUsuario);
router.put("/:id_usuario", usuarioController.updateUsuario);
router.post("/login", usuarioController.loginUsuario);
export default router;