const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuarioController");

/*  */router.post("/registrarUsuario", UsuarioController.RegistrarUsuario);

/*  */router.post("/loginUsuario", UsuarioController.LoginUsuario);

/*  */router.post("/logoutUsuario", UsuarioController.LogoutUsuario);

/*  */router.get("/checkSession", UsuarioController.checkSession);
module.exports = router;