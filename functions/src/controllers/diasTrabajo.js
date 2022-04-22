const admin = require('../../firebase-service')
const DiasTrabajo = require("../models/DiasTrabajo")

const controller = {}

controller.crearDiasTrabajo = async (req, res) => {
    console.log("asdasdadsad")
    try {
        const { body, otrosDatos } = req
        const { datosDiasTrabajo } = body
        console.log("ff")

        // Crear DiasTrabajo
        const diasTrabajo = new DiasTrabajo(datosDiasTrabajo)
        DiasTrabajo.crearDiasTrabajo(diasTrabajo)


        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se crearon los dias de trabajo de forma correcta.',
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al crear los dias de trabajo.',
            resultado: error,
        })
    }
    
}

controller.obtenerDiasTrabajo = async (req, res) => {

}

controller.actualizarDiasTrabajo = async (req, res) => {
    try {
        const { body, params, otrosDatos } = req
        const { datosDiasTrabajo } = body
        const { uid } = params

        // Crear DiasTrabajo
        DiasTrabajo.actalizarDiasTrabajoPorUID(uid, datosDiasTrabajo)


        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se actualizaron los dias de trabajo de forma correcta.',
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al actualizaron los dias de trabajo.',
            resultado: error,
        })
    }
} 

module.exports = controller