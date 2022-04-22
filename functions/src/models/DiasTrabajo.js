const db = require('../../db')

const COLECCION = 'DiasTrabajo'

class DiasTrabajo {

    constructor (datosDiasTrabajo = {}) {
        const { uid, diasCodigo } = datosDiasTrabajo

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.diasCodigo = diasCodigo ? diasCodigo : []
    }

    getDiasTrabajo () {
        return {
            uid: this.uid,
            diasCodigo: this.diasCodigo,
        }
    }

    setDiasTrabajo (datosDiasTrabajo) {
        this.setUid(datosDiasTrabajo.uid)
        this.setDiasCodigo(datosDiasTrabajo.diasCodigo)
    }

    setUid (uid = '') {
        this.uid = uid
        return this
    }

    setDiasCodigo ( diasCodigo = [] ) {
        this.diasCodigo = diasCodigo
        return this
    }


    /**
     * Metodos Estaticos
    */
    static async crearDiasTrabajo ( diasTrabajo = new DiasTrabajo() ) {
        // Crear los datos en firestore para el nuevo diasTrabajo
        db.collection(COLECCION).doc(diasTrabajo.uid).set(diasTrabajo.getDiasTrabajo())
        return true
    }

    static async obtenerDiasTrabajoPorUID ( uid = '' ) {
        
        let diasTrabajoDoc = await db.collection(COLECCION).doc(uid).get()
        const diasTrabajo = new DiasTrabajo(diasTrabajoDoc.data())

        return diasTrabajo
    }

    static async actalizarDiasTrabajoPorUID ( uidDiasTrabajo = '', datosActualizados = {} ) {
        // Actualizar los datos de firestore del diasTrabajo
        let existe = !!Object.keys(datosActualizados).length
        
        if (existe) 
            db.collection(COLECCION).doc(uidDiasTrabajo).update(datosActualizados)
        
        return existe
    }

    static async eliminarDiasTrabajoPorUID ( uidDiasTrabajo = '' ) {
        return await db.collection(COLECCION).doc(uidDiasTrabajo).delete()
    }
}

module.exports = DiasTrabajo