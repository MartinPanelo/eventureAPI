const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const asistenteController = {
	RegistrarUsuario: (req, res) => {
		const { nombre, correo, contrasena, repetirContrasena } = req.body;
		if (!nombre || !correo || !contrasena || !repetirContrasena) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}
		//controlo que el correo sea unico

		Usuario.UsuarioPorCorreo(correo, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}
			if (results.length > 0) {
				return res.status(400).json({
					success: false,
					error: "El correo ya esta registrado",
				});
			}

			// controlo que la contrasena sea valida

			if (contrasena !== repetirContrasena) {
				return res.status(400).json({
					success: false,
					error: "Las contrasenas no coinciden",
				});
			}

			//hasheo la contrasena
			const saltRounds = 10;
			const salt = bcryptjs.genSaltSync(saltRounds);
			const hashPassword = bcryptjs.hashSync(contrasena, salt);

			// agrego el usuario
			Usuario.AgregarUsuario(nombre, correo, hashPassword, (err, results) => {
				if (err) {
					console.log("Se produjo el siguiente error:" + err);
					return res.status(400).json({ success: false, error: err });
				}
				return res.status(200).json({ success: true, data: results });
			});
		});
	},

	LoginUsuario: async (req, res) => {
		const { correo, contrasena } = req.body;

		if (!correo || !contrasena) {
			return res.status(400).json({
				success: false,
				error: "Faltan datos",
			});
		}

		// Verifica si el correo existe en la base de datos
		Usuario.UsuarioPorCorreo(correo, (err, results) => {
			if (err) {
				console.log("Se produjo el siguiente error:" + err);
				return res.status(400).json({ success: false, error: err });
			}

			// Compara la contraseña proporcionada con la almacenada
			const usuario = results[0]; // Suponiendo que el correo es único
			console.log(usuario);

			bcryptjs.compare(contrasena, usuario.Contrasena, (err, isMatch) => {
				if (err) {
					console.log("Se produjo un error al comparar contraseñas: " + err);
					return res.status(400).json({ success: false, error: "Se produjo un error al comparar contraseñas: " + err });
				}
				// Verifica si las credenciales son correctas
				if (!isMatch || results.length === 0) {
					return res.status(400).json({
						success: false,
						error: "Usuario y/o contraseña incorrectos",
					});
				}

				// si las credenciales son correctas, almaceno la sesión del usuario

				req.session.user = { UsuarioId: usuario.Id, Rol: usuario.Rol };

				return res.status(200).json({
					success: true,
					usuario: {
						rol: usuario.Rol,
						correo: usuario.Correo,
					},
					message: "Login exitoso",
				});
			});
		});
	},

	LogoutUsuario: async (req, res) => {
		// Verifica si el usuario está logueado
		if (req.session.user) {
			// Destruye la sesión actual
			req.session.destroy((err) => {
				if (err) {
					return res.status(500).json({
						success: false,
						error: "Error al cerrar sesión",
					});
				}

				// Si la sesión se destruyó correctamente, responde con un mensaje de éxito
				return res.status(200).json({
					success: true,
					message: "Sesión cerrada exitosamente",
				});
			});
		} else {
			// Si no hay sesión activa, se responde con un error
			return res.status(400).json({
				success: false,
				error: "No hay una sesión activa",
			});
		}
	},
};

module.exports = asistenteController;
