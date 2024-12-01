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
		const query = "SELECT * FROM eventos ORDER BY Fecha ASC";

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
	EventosProximos: (idUser, callback) => {
		const query = `
        SELECT e.*
        FROM eventos e
        WHERE e.Id NOT IN (
            SELECT EventoId 
            FROM registros r
            WHERE r.UsuarioId = ?
        ) AND e.Fecha >= CURDATE()
        ORDER BY e.Fecha ASC
    `;

		connectionDB.query(query, [idUser], callback);
	},

	EventosInscrito: (idUser, callback) => {
		const query = `
		SELECT e.*, r.Asistencia, r.Id As IdRegistro
		FROM eventos e
		JOIN registros r ON e.Id = r.EventoId
		WHERE r.UsuarioId = ?

		ORDER BY e.Fecha ASC;
	`;

		connectionDB.query(query, [idUser], callback);
	},

	EmitirCertificado: (EventoId, UsuarioId, callback) => {
		const query = `
		SELECT u.Nombre AS NombreUsuario, u.Correo AS ConrreoUsuario, e.Nombre AS NombreEvento, e.Fecha AS FechaEvento, e.Ubicacion AS UbicacionEvento, e.Descripcion AS DescripcionEvento
		FROM registros r
		JOIN usuarios u ON r.UsuarioId = u.Id
		JOIN eventos e ON r.EventoId = e.Id
		WHERE r.UsuarioId = ?
		AND r.EventoId = ?
        AND r.Asistencia = 1;
		`;
		connectionDB.query(query, [UsuarioId, EventoId], callback);
	}
};

module.exports = Evento;
