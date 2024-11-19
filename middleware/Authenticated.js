// middleware/auth.js
const isAuthenticated = async (req, res, next) => {
    try {
        // Verificar si el usuario tiene una sesion activa
        if (req.session.user) {
            next();
        } else {
            res.status(401).json({
                success: false, 
                message: "No autenticado"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

module.exports = isAuthenticated;