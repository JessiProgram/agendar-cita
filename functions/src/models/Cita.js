const admin = require('../../firebase-service')
const db = require('../../db')

const COLECCION = 'Citas'

class Cita {

    constructor (datosCita = {}) {
        const { uid, nombreCompleto, cedula, telefono, fechaCita } = datosCita
        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.nombreCompleto = nombreCompleto ? nombreCompleto : ''
        this.cedula = cedula ? cedula : ''
        this.telefono = telefono ? telefono : ''
        this.fechaCita = fechaCita ? fechaCita : null
    }

    getCita () {
        return {
            uid: this.uid,
            nombreCompleto: this.nombreCompleto,
            cedula: this.cedula,
            telefono: this.telefono,
            fechaCita: this.fechaCita,
        }
    }

    setCita (datosCita) {
        this.setUid(datosCita.uid)
        this.setNombreCompleto(datosCita.nombreCompleto)
        this.setCedula(datosCita.cedula)
        this.setTelefono(datosCita.telefono)
        this.setFechaCita(datosCita.fechaCita)
    }

    setUid (uid = '') {
        this.uid = uid
        return this
    }

    setNombreCompleto ( nombreCompleto = '' ) {
        this.nombreCompleto = nombreCompleto
        return this
    }

    setCedula (cedula = '') {
        this.cedula = cedula
        return this
    }

    setTelefono ( telefono = '' ) {
        this.telefono = telefono
        return this
    }

    setFechaCita ( fechaCita = null ) {
        this.fechaCita = fechaCita
        return this
    }

    /**
     * Metodos Estaticos
    */
    static async crearCita ( cita = new Cita() ) {
        // Crear los datos en firestore para el nuevo cita
        db.collection(COLECCION).doc(cita.uid).set(cita.getCita())

        return true
    }

    static async obtenerCitaPorUID ( uid = '' ) {
        
        let citaDoc = await db.collection(COLECCION).doc(uid).get()
        const cita = new Cita(citaDoc.data())

        return cita
    }

    static async actalizarCitaPorUID ( uidCita = '', datosActualizados = {} ) {
        // Actualizar los datos de firestore del cita
        let existe = !!Object.keys(datosActualizados).length
        
        if (existe) 
            db.collection(COLECCION).doc(uidCita).update(datosActualizados)
        
        return existe
    }

    static async eliminarCitaPorUID ( uidCita = '' ) {
        return await db.collection(COLECCION).doc(uidCita).delete()
    }
}

module.exports = Cita