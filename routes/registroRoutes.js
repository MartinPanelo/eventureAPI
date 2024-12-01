const express = require("express");
const router = express.Router();
const registros = require("../controllers/registroController");
const isAuthenticated = require("../middleware/Authenticated");
const isAuthorized = require("../middleware/authorized");

/*  */router.post("/agregarParticipacion",isAuthenticated, isAuthorized(["cliente"]), registros.AgregarParticipacion);

/*  */router.put("/marcarAsistencia/:id",isAuthenticated, isAuthorized(["organizador"]), registros.MarcarAsistencia);

/*  */router.get("/listarConfirmados/:id",/* isAuthenticated, isAuthorized(["organizador"]), */ registros.listarConfirmados);

/*  */router.get("/emitirCertificado/:id",isAuthenticated, isAuthorized(["cliente"]), registros.EmitirCertificado);

/*  */router.delete("/eliminarParticipacion/:id",isAuthenticated, isAuthorized(["cliente"]), registros.CancelarParticipacion);

module.exports = router;