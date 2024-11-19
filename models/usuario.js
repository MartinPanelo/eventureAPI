const connectionDB = require("../config/connectDB");

const Usuario = {
    AgregarUsuario: (nombre, correo, contrasena, callback) => {
        const query = "INSERT INTO usuarios (Nombre, Correo, Rol, Contrasena) VALUES (?, ?, ?, ?)";
        connectionDB.query(query, [nombre, correo, 'Cliente', contrasena], callback);
    },

    UsuarioPorCorreo: (correo, callback) => {
        const query = "SELECT * FROM usuarios WHERE Correo = ?";
        connectionDB.query(query, [correo], callback);
    },
}

module.exports = Usuario;