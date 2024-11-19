const registros = require("../models/Registros");
const eventos = require("../models/evento");

const registroController = {
	AgregarParticipacion: async (req, res) => {
		try {
			const { eventoId } = req.body;
			const usuarioId = req.usuarioLogeado.id;

			if (!eventoId || !usuarioId) {
				return res.status(400).json({
					success: false,
					error: "Faltan datos",
				});
			}

			// Buscar evento
			const buscarEvento = () => {
				return new Promise((resolve, reject) => {
					eventos.BuscarEventoPorId(eventoId, (err, results) => {
						if (err) reject(err);
						else resolve(results);
					});
				});
			};
			// Buscar registro
			const buscarRegistro = () => {
				return new Promise((resolve, reject) => {
					registros.BuscarRegistroPorIds(usuarioId, eventoId, (err, results) => {
						if (err) reject(err);
						else resolve(results);
					});
				});
			};
			// Agregar participacion
			const agregarParticipacion = () => {
				return new Promise((resolve, reject) => {
					registros.AgregarParticipacion(usuarioId, eventoId, (err, results) => {
						if (err) reject(err);
						else resolve(results);
					});
				});
			};
			// Buscar evento
			const eventosResults = await buscarEvento();
			if (!eventosResults || eventosResults.length === 0) {
				return res.status(400).json({
					success: false,
					error: "El evento no existe",
				});
			}

			// Validar fecha
			if (new Date(eventosResults[0].Fecha) < new Date()) {
				return res.status(400).json({
					success: false,
					error: "El evento ya paso",
				});
			}

			// Verificar registro existente
			const registroExistente = await buscarRegistro();
			if (registroExistente && registroExistente.length > 0) {
				return res.status(400).json({
					success: false,
					error: "El usuario ya se encuentra registrado",
				});
			}

			// Agregar participación
			const resultado = await agregarParticipacion();
			return res.status(200).json({ success: true, data: resultado });
            
		} catch (error) {
			console.log("Se produjo el siguiente erroR:", error);
			return res.status(400).json({ success: false, error: error.message });
		}
	},



	MarcarAsistencia: (req, res) => {
		const { usuarioId, eventoId, asistencia } = req.body;
		if ((!usuarioId || !eventoId, !asistencia)) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}

		// controlo que el evento exista

		eventos.BuscarEventoPorId(eventoId, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			if (results.length === 0) {
				return res.status(400).json({
					success: false,
					error: "El evento no existe",
				});
			} else {
				//controlo las fechas
				if (new Date(results[0].Fecha) > new Date()) {
					return res.status(400).json({
						success: false,
						error: "El evento aun no paso",
					});
				}

				registros.MarcarAsistencia(usuarioId, eventoId, asistencia, (err, results) => {
					if (err) {
						console.log("Se produjo el siguiente error:" + err);
						return res.status(400).json({ success: false, error: err });
					}
					return res.status(200).json({ success: true, data: results });
				});
			}
		});
	},

	listarConfirmados: (req, res) => {
		const { eventoId } = req.body;
		if (!eventoId) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}
		registros.listarConfirmados( eventoId, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
            const evento = {
                Nombre: results[0].Nombre,
                Fecha: results[0].Fecha,
                Ubicacion: results[0].Ubicacion,
                Descripcion: results[0].Descripcion,
            };
        
            // Lista de usuarios confirmados, sin la repetición de datos del evento
            const usuarios = results.map(row => ({
                Nombre: row.NombreUsuario, 
                Correo: row.Correo,
                Asistencia: row.Asistencia
            }));
			return res.status(200).json({ success: true, data: { evento, usuarios } });
		});
	},

	EmitirCertificado: (req, res) => {
		const { id_asistente, id_evento } = req.body;
		if (!id_evento || !id_asistente) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}
		Participacion.EmitirCertificado(id_asistente, id_evento, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			return res.status(200).json({ success: true, data: results });
		});
	},
};

module.exports = registroController;
