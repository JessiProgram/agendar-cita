const admin = require('../../firebase-service')
const Usuario = require("../models/Usuario")
const Authentication = require("../models/Autenticacion")

const controller = {}

controller.crearUsuario = async (req, res) => {
    try {
        const { body, otrosDatos } = req
        const { datosUsuario, contrasenha } = body

        // Crear usuario
        const auth = new Authentication()
        const usuario = new Usuario(datosUsuario)

        const uid = await auth.crear(usuario, contrasenha)
        
        usuario.setUid(uid)
        Usuario.crearUsuario(usuario)

        const user = await auth.obtener()

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se creo el usuario de forma correcta.',
            resultado: {
                auth: user,
                firestore: usuario
            }
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al crear el usuario.',
            resultado: error,
        })
    }
}

controller.actualizarRol = async (req, res) => {
    try {
        const { otrosDatos, params, body } = req
        const { uid } = params
        const { rol } = body
        
        Usuario.actalizarUsuarioPorUID(uid, {
            rol
        })

        const auth = new Autenticacion(uid)
        auth.actualizar({
            claims: { rol }
        })

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se cambio el rol usuario de forma correcta.',
            resultado: "ok"
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al cambiar el rol el usuario.',
            resultado: error,
        })
    }
}

module.exports = controller