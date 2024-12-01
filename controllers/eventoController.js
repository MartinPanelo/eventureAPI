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
		const fechaFormateada = formatDateForMySQL(fecha);

		Evento.AgregarEvento(nombre, fechaFormateada, ubicacion, descripcion, (err, results) => {
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
			//console.log(results);
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

		// controlo que la fecha sea valida
		if (new Date(fecha) < new Date()) {
			return res.status(400).json({
				success: false,
				error: "La fecha debe ser posterior a la actual",
			});
		}

		// formateo la fecha
		const fechaFormateada = formatDateForMySQL(fecha);
		Evento.ModificarEvento(id, nombre, fechaFormateada, ubicacion, descripcion, (err, results) => {
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

		const id = req.session.user?.UsuarioId ?? -1; // -1 es cuando se lista los eventos para un usuario no logueado

		if (!id) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}
		Evento.EventosProximos(id,(err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			return res.status(200).json({ success: true, data: results });
		});
	},


	EventosInscrito: (req, res) => {
		const  id  = req.session.user.UsuarioId;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}
		Evento.EventosInscrito(id, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			return res.status(200).json({ success: true, data: results });
		});
	},
};

const formatDateForMySQL = (date) => {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	const hours = String(d.getHours()).padStart(2, "0");
	const minutes = String(d.getMinutes()).padStart(2, "0");
	const seconds = String(d.getSeconds()).padStart(2, "0");
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
module.exports = eventoController;
