const connectionDB = require("../config/connectDB");

const Registros = {
    AgregarParticipacion: (UsuarioId, EventoId, callback) => {
		const query = `
        INSERT INTO registros (UsuarioId, EventoId, Asistencia)
        VALUES (?, ?, ?);
        `;
		connectionDB.query(query, [UsuarioId, EventoId, 0], callback);
	},

	MarcarAsistencia: (UsuarioId, EventoId, Asistencia, callback) => {
		const query = `
        UPDATE registros r
        JOIN eventos e ON r.EventoId = e.Id
        SET r.Asistencia = ?
        WHERE r.UsuarioId = ?
        AND r.EventoId = ?;
        `;
		connectionDB.query(query, [Asistencia, UsuarioId, EventoId], callback);
	},

    listarConfirmados: (EventoId, callback) => {
        const query = `
        SELECT r.Id, r.Asistencia, u.Nombre AS NombreUsuario, u.Id, u.Correo, e.Nombre, e.Fecha, e.Ubicacion, e.Descripcion
        FROM registros r
        JOIN usuarios u ON r.UsuarioId = u.Id
        JOIN eventos e ON r.EventoId = e.Id
       
        AND r.EventoId = ?;
        `;
        connectionDB.query(query, [EventoId], callback);
    },


    EmitirCertificado: (UsuarioId, EventoId, callback) => {
        const query = `
       SELECT
            u.Nombre AS NombreUsuario,
            u.Correo AS ConrreoUsuario,
            e.Nombre AS NombreEvento,
            e.Fecha AS FechaEvento,
            e.Ubicacion AS UbicacionEvento,
            e.Descripcion AS DescripcionEvento
        FROM
            registros r
        JOIN
            Usuarios u ON r.UsuarioId = u.Id
        JOIN
            eventos e ON r.EventoId = e.Id
        WHEREs
            r.UsuarioId = ?
            AND r.EventoId = ?;
        `;
        connectionDB.query(query, [UsuarioId, EventoId], callback);
    },

    BuscarRegistroPorIds : (UsuarioId, EventoId, callback) => {
        const query = `
        SELECT * FROM registros WHERE UsuarioId = ? AND EventoId = ?;
        `;
        connectionDB.query(query, [UsuarioId, EventoId], callback);
    },

    CancelarParticipacion : (EventoId, UsuarioId, callback) => {
        const query = `
        DELETE FROM registros WHERE EventoId = ? AND UsuarioId = ?;
        `;
        connectionDB.query(query, [EventoId, UsuarioId], callback);
    }
};

module.exports = Registros;