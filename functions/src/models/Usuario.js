const admin = require('../../firebase-service')
const db = require('../../db')

const COLECCION = 'Usuarios'

class Usuario {

    constructor (datosUsuario = {}) {
        const { uid, nombreUsuario, correo, rol} = datosUsuario

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.nombreUsuario = nombreUsuario ? nombreUsuario : ''
        this.correo = correo ? correo : ''
        this.rol = rol ? rol : 'cliente'
    }

    getUsuario () {
        return {
            uid: this.uid,
            nombreUsuario: this.nombreUsuario,
            correo: this.correo,
            rol: this.rol,
        }
    }

    setUsuario (datosUsuario) {
        this.setUid(datosUsuario.uid)
        this.setNombreUsuario(datosUsuario.nombreUsuario)
        this.setCorreo(datosUsuario.correo)
        this.setRol(datosUsuario.rol)
    }

    setUid (uid = '') {
        this.uid = uid
        return this
    }

    setNombreUsuario ( nombreUsuario = '' ) {
        this.nombreUsuario = nombreUsuario
        return this
    }

    setCorreo (correo = '') {
        this.correo = correo
        return this
    }

    setRol ( rol = 'cliente' ) {
        this.rol = rol
        return this
    }

    /**
     * Metodos Estaticos
    */
    static async crearUsuario ( usuario = new Usuario() ) {
        // Crear los datos en firestore para el nuevo usuario
        db.collection(COLECCION).doc(usuario.uid).set(usuario.getUsuario())

        return true
    }

    static async obtenerUsuarioPorUID ( uid = '' ) {
        
        let usuarioDoc = await db.collection(COLECCION).doc(uid).get()
        const usuario = new Usuario(usuarioDoc.data())

        return usuario
    }

    static async actalizarUsuarioPorUID ( uidUsuario = '', datosActualizados = {} ) {
        // Actualizar los datos de firestore del usuario
        let existe = !!Object.keys(datosActualizados).length
        
        if (existe) 
            db.collection(COLECCION).doc(uidUsuario).update(datosActualizados)
        
        return existe
    }

    static async eliminarUsuarioPorUID ( uidUsuario = '' ) {
        return await db.collection(COLECCION).doc(uidUsuario).delete()
    }
}

module.exports = Usuario