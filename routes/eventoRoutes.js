const express = require("express");
const router = express.Router();
const EventoController = require("../controllers/eventoController");
const Authenticated = require("../middleware/Authenticated");
const Authorized = require("../middleware/authorized");


/*  */router.post("/agregarEvento",Authenticated, Authorized(["organizador"]), EventoController.AgregarEvento);

/*  */router.get("/listarTodosEventos",Authenticated, Authorized(["organizador"]), EventoController.ListarTodosEventos);

/*  */router.get("/DetalleEvento/:id", EventoController.DetalleEvento);

/*  */router.put("/modificarEvento/:id",Authenticated, Authorized(["organizador"]), EventoController.ModificarEvento);

/*  */router.delete("/eliminarEvento/:id",Authenticated, Authorized(["organizador"]), EventoController.EliminarEvento);

/*  */router.get("/eventosProximos", EventoController.EventosProximos);

/*  */router.get("/eventosinscrito", EventoController.EventosInscrito);



module.exports = router;