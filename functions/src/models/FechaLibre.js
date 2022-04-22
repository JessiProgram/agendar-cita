const db = require('../../db')

const COLECCION = 'FechasLibres'

class FechaLibre {

    constructor (datosFechaLibre = {}) {
        const { uid, fecha } = datosFechaLibre

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.fecha = fecha ? fecha : []
 
    }

    getFechaLibre () {
        return {
            uid: this.uid,
            fecha: this.fecha,
        }
    }

    setFechaLibre (datosFechaLibre) {
        this.setUid(datosFechaLibre.uid)
        this.setFecha(datosFechaLibre.fecha)
    }

    setUid (uid = '') {
        this.uid = uid
        return this
    }

    setFecha ( fecha = [] ) {
        this.fecha = fecha
        return this
    }


    /**
     * Metodos Estaticos
    */
    static async crearFechaLibre ( diasTrabajo = new FechaLibre() ) {
        // Crear los datos en firestore para el nuevo diasTrabajo
        db.collection(COLECCION).doc(diasTrabajo.uid).set(diasTrabajo.getFechaLibre())

        return true
    }

    static async obtenerFechaLibrePorUID ( uid = '' ) {
        
        let diasTrabajoDoc = await db.collection(COLECCION).doc(uid).get()
        const diasTrabajo = new FechaLibre(diasTrabajoDoc.data())

        return diasTrabajo
    }

    static async actalizarFechaLibrePorUID ( uidFechaLibre = '', datosActualizados = {} ) {
        // Actualizar los datos de firestore del diasTrabajo
        let existe = !!Object.keys(datosActualizados).length
        
        if (existe) 
            db.collection(COLECCION).doc(uidFechaLibre).update(datosActualizados)
        
        return existe
    }

    static async eliminarFechaLibrePorUID ( uidFechaLibre = '' ) {
        return await db.collection(COLECCION).doc(uidFechaLibre).delete()
    }
}

module.exports = FechaLibre