const express = require("express");
const router = express.Router();
const registros = require("../controllers/registroController");
const isAuthenticated = require("../middleware/Authenticated");
const isAuthorized = require("../middleware/authorized");

router.put("/agregarParticipacion",isAuthenticated, isAuthorized(["cliente"]), registros.AgregarParticipacion);

router.put("/marcarAsistencia",isAuthenticated, isAuthorized(["organizador"]), registros.MarcarAsistencia);

router.get("/listarConfirmados",isAuthenticated, isAuthorized(["organizador"]), registros.listarConfirmados);

router.get("/emitirCertificado",isAuthenticated, isAuthorized(["cliente"]), registros.EmitirCertificado);

module.exports = router;