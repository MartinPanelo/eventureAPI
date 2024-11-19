const Evento = require("../models/evento");

const eventoController = {
	AgregarEvento: (req, res) => {
		const { nombre, fecha, ubicacion, descripcion } = req.body;
		if (!nombre || !fecha || !ubicacion || !descripcion) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}
		// controlo que la fecha sea valida
		if (new Date(fecha) < new Date()) {
			return res.status(400).json({
				success: false,
				error: "La fecha debe ser posterior a la actual",
			});
		}

		Evento.AgregarEvento(nombre, fecha, ubicacion, descripcion, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			return res.status(200).json({ success: true, data: results });
		});
	},

	ListarTodosEventos: (req, res) => {
		Evento.ListarTodosEventos((err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			return res.status(200).json({ success: true, data: results });
		});
	},

	DetalleEvento: (req, res) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}

		Evento.BuscarEventoPorId(id, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			return res.status(200).json({ success: true, data: results });
		});
	},

	ModificarEvento: (req, res) => {
		const { id } = req.params;
		const { nombre, fecha, ubicacion, descripcion } = req.body;
		if (!id || !nombre || !fecha || !ubicacion || !descripcion) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}

		// Convertir la fecha de UTC a hora local (Argentina GMT-3)
const fechaUTC = new Date(fecha); // Fecha recibida en UTC
const fechaLocal = new Date(fechaUTC.getTime() - (3 * 60 * 60 * 1000)); // Restar 3 horas para ajustar a GMT-3

// Formatear la fecha ajustada a formato MySQL (YYYY-MM-DD HH:MM:SS)
const fechaMySQL = fechaLocal.toISOString().slice(0, 19).replace("T", " ");

console.log("Fecha ajustada a GMT-3:", fechaMySQL);


		// controlo que la fecha sea valida
		if (new Date(fecha) < new Date()) {
			return res.status(400).json({
				success: false,
				error: "La fecha debe ser posterior a la actual",
			});
		}

		Evento.ModificarEvento(id, nombre, fechaMySQL, ubicacion, descripcion, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			return res.status(200).json({ success: true, data: results });
		});
	},

	EliminarEvento: (req, res) => {
		const { id } = req.params;
		console.log(id);
		if (!id) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}
		Evento.EliminarEvento(id, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			return res.status(200).json({ success: true, data: results });
		});
	},


	EventosProximos: (req, res) => {
		Evento.EventosProximos((err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			return res.status(200).json({ success: true, data: results });
		});
	},
};

module.exports = eventoController;
