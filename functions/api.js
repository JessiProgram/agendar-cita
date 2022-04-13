const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/usuarios', require('./src/routes/usuarios'))

app.use((err, req, res, next) => {
    // Manejo de errores para {{ err }}
    console.log('err', err.metadata)
    res.status(500).json({
        err
    })
})

module.exports = app