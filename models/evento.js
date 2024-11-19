const connectionDB = require("../config/connectDB");

const Evento = {
	AgregarEvento: (nombre, fecha, ubicacion, descripcion, callback) => {
		const query = "INSERT INTO eventos (Nombre, Fecha, Ubicacion, Descripcion) VALUES (?, ?, ?, ?)";

		connectionDB.query(query, [nombre, fecha, ubicacion, descripcion], callback);
	},
	BuscarEventoPorId: (id, callback) => {
		const query = "SELECT * FROM eventos WHERE Id = ?";

		connectionDB.query(query, [id], callback);
	},

	ListarTodosEventos: (callback) => {
		const query = "SELECT * FROM eventos";

		connectionDB.query(query, callback);
	},

	ModificarEvento: (id, nombre, fecha, ubicacion, descripcion, callback) => {
		const query = "UPDATE eventos SET Nombre = ?, Fecha = ?, Ubicacion = ?, Descripcion = ? WHERE Id = ?";

		connectionDB.query(query, [nombre, fecha, ubicacion, descripcion, id], callback);
	},

	EliminarEvento: (id, callback) => {
		const query = "DELETE FROM eventos WHERE Id = ?";

		connectionDB.query(query, [id], callback);
	},
	EventosProximos: (callback) => {
		const query = "SELECT * FROM eventos WHERE Fecha >= CURDATE() ORDER BY Fecha ASC";

		connectionDB.query(query, callback);
	},

};

module.exports = Evento;
