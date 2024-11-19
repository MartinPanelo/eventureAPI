const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const cookieParser = require('cookie-parser');



const cors = require("cors");
// Use CORS middleware
app.use(
	cors({
        origin: "http://localhost:4200",
		credentials: true,
	})
);

app.use(cookieParser());
const session = require('express-session');

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // En producción usar 'secure: true' si se v a a usar HTTPS
}));

const eventoRoutes = require("./routes/eventoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const registroRoutes = require("./routes/registroRoutes");

const connection = require("./config/connectDB");

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//conectar a la base de datos
connection.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Conectado a DB con exito");
	}
});

// Configurar las rutas de la API
app.use("/eventos", eventoRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/registros", registroRoutes);

// Iniciar el servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
