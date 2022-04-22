const admin = require('../../firebase-service')
const db = require('../../db')

const COLECCION = 'HorasDisponibles'

class HoraDisponible {

    constructor (datosHoraDisponible = {}) {
        const { uid, horaInicio, horaFin, fecha } = datosHoraDisponible

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.horaInicio = horaInicio ? horaInicio : ''
        this.horaFin = horaFin ? horaFin : ''
        this.fecha = fecha ? fecha : null
    }

    getHoraDisponible () {
        return {
            uid: this.uid,
            horaInicio: this.horaInicio,
            horaFin: this.horaFin,
            fecha: this.fecha,
        }
    }

    setHoraDisponible (datosHoraDisponible) {
        this.setUid(datosHoraDisponible.uid)
        this.setHoraInicio(datosHoraDisponible.horaInicio)
        this.setHoraFin(datosHoraDisponible.horaFin)
        this.setFecha(datosHoraDisponible.fecha)
    }

    setUid (uid = '') {
        this.uid = uid
        return this
    }

    setHoraInicio (horaInicio = '') {
        this.horaInicio = horaInicio
        return this
    }

    setHoraFin ( horaFin = '' ) {
        this.horaFin = horaFin
        return this
    }

    setFecha ( fecha = null ) {
        this.fecha = fecha
        return this
    }

    /**
     * Metodos Estaticos
    */
    static async crearHoraDisponible ( horaDisponible = new HoraDisponible() ) {
        // Crear los datos en firestore para el nuevo horaDisponible
        db.collection(COLECCION).doc(horaDisponible.uid).set(horaDisponible.getHoraDisponible())

        return true
    }

    static async obtenerHoraDisponiblePorUID ( uid = '' ) {
        
        let horaDisponibleDoc = await db.collection(COLECCION).doc(uid).get()
        const horaDisponible = new HoraDisponible(horaDisponibleDoc.data())

        return horaDisponible
    }

    static async actalizarHoraDisponiblePorUID ( uidHoraDisponible = '', datosActualizados = {} ) {
        // Actualizar los datos de firestore del horaDisponible
        let existe = !!Object.keys(datosActualizados).length
        
        if (existe) 
            db.collection(COLECCION).doc(uidHoraDisponible).update(datosActualizados)
        
        return existe
    }

    static async eliminarHoraDisponiblePorUID ( uidHoraDisponible = '' ) {
        return await db.collection(COLECCION).doc(uidHoraDisponible).delete()
    }
}

module.exports = HoraDisponible