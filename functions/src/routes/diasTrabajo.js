const { Router } = require('express')
const router = Router()

//const middlewareUsuario = require('../middlewares/usuario')
const controller = require('../controllers/diasTrabajo')

router.post('/crearDiasTrabajo', controller.crearDiasTrabajo)
router.put('/actualizarDiasTrabajo/:uid', controller.actualizarDiasTrabajo)

module.exports = router