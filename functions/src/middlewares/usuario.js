const admin = require('../../firebase-service')
const middleware = {}

middleware.esAdmin = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.otrosDatos
        
        const rol = datosAuthSolicitante.customClaims.rol

        if ( rol !== 'admin' ) {
            // No autorizado
            throw new Error("Usuario no autorizado")
        }
        
        return next()

    } catch ( error ) {
        next(error)

    }

}

middleware.estaAutenticado = (req, res, next) => {

    const myNext = async () => {
        
        try {
            const { authToken } = req.otrosDatos

            const userInfo = await admin.auth().verifyIdToken( authToken )
            req.otrosDatos.uidSolicitante = userInfo.uid

            const datosAuthSolicitante = await admin.auth().getUser( userInfo.uid )
            req.otrosDatos.datosAuthSolicitante = datosAuthSolicitante

            if ( datosAuthSolicitante.disabled ) throw new Error("Usuario deshabilitado")

            return next()
    
        } catch ( error ) {
            console.log('estaAutenticado: ', error)
            next(error)
        }
    }

    getAuthToken(req, res, myNext)
    
}


middleware.validarPermisosParaActualizacionDeRol = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.otrosDatos
        const { uidUsuario } = req.params
        const { rol } = req.body

        
        
        return next()

    } catch ( error ) {
        next(error)

    }

}



module.exports = middleware