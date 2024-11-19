// middleware/authorize.js
const isAuthorizer = (rolesPermitidos) => {
    return (req, res, next) => {
        try {

            // Verifica si el rol del usuario está en los roles permitidos
            if (!rolesPermitidos.includes(req.session.user.Rol)) {
                return res.status(403).json({
                    success: false,
                    message: "No tiene permisos para acceder a este recurso"
                });
            }

            // Si tiene los permisos, continúa con la solicitud
            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error interno del servidor",
                error: error.message
            });
        }
    };
};

module.exports = isAuthorizer;