const registros = require("../models/Registros");
const eventos = require("../models/evento");

const registroController = {
	AgregarParticipacion: async (req, res) => {
		try {
			const { eventoId } = req.body;
			const usuarioId = req.session.user.UsuarioId;

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
		const { usuarioId, asistencia } = req.body;
		const { id } = req.params; // id del registro
		console.log(usuarioId, asistencia, id);
		if (!usuarioId || !id) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}

		// controlo que el evento exista

		eventos.BuscarEventoPorId(id, (err, results) => {
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

				registros.MarcarAsistencia(usuarioId, id, asistencia, (err, results) => {
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
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}

		eventos.BuscarEventoPorId(id, (err, resultsEvento) => {
			if (err) {
				console.error("Se produjo el siguiente error:", err);
				return res.status(500).json({
					success: false,
					error: "Error interno del servidor",
				});
			}

			if (!resultsEvento || resultsEvento.length === 0) {
				return res.status(404).json({
					success: false,
					error: "El evento no existe",
				});
			}

			const evento = {
				id: resultsEvento[0].Id,
				nombre: resultsEvento[0].Nombre,
				fecha: resultsEvento[0].Fecha,
				ubicacion: resultsEvento[0].Ubicacion,
				descripcion: resultsEvento[0].Descripcion,
			};

			registros.listarConfirmados(id, (err, resultsRegistro) => {
				if (err) {
					console.error("Se produjo el siguiente error:", err);
					return res.status(500).json({
						success: false,
						error: "Error interno del servidor",
					});
				}

				if (!resultsRegistro || resultsRegistro.length === 0) {
					return res.status(200).json({
						success: true,
						data: { evento, usuarios: [] }, // El evento existe, pero no hay usuarios confirmados
					});
				}

				const usuarios = resultsRegistro.map((row) => ({
					id: row.Id,
					nombre: row.NombreUsuario,
					correo: row.Correo,
					asistencia: row.Asistencia,
				}));

				return res.status(200).json({
					success: true,
					data: { evento, usuarios },
				});
			});
		});
	},

	EmitirCertificado: (req, res) => {
		const { id } = req.params;
		const  idUsuario  = req.session.user.UsuarioId;
		if (!id || !idUsuario) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}
		eventos.EmitirCertificado(id, idUsuario, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			return res.status(200).json({ success: true, data: results });
		});
	},

	CancelarParticipacion: (req, res) => {
		const { id } = req.params; // id del evento
		const iduser = req.session.user.UsuarioId;
		if (!id || !iduser) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}
	
		// Primero buscar el evento
		eventos.BuscarEventoPorId(id, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
	
			// Si no se encuentra el evento
			if (results.length === 0) {
				return res.status(404).json({
					success: false,
					error: "Evento no encontrado",
				});
			}
	
			// Verificar si el evento ya pasó
			const evento = results[0];
			if (evento.Fecha < new Date()) {
				return res.status(400).json({
					success: false,
					error: "El evento ya pasó, no se puede cancelar la participación",
				});
			}
	
			// Cancelar participación
			registros.CancelarParticipacion(id, iduser, (err, results) => {
				if (err) {
					console.log("Se produjo el siguiente error:" + err);
					return res.status(400).json({ success: false, error: err });
				}
				return res.status(200).json({ success: true, data: results });
			});
		});
	},
};

module.exports = registroController;
