const mongoose = require('mongoose')
const {Schema} = mongoose

const RequestSchema = new Schema({
    partidaP: {
        type: String,
        required: true
    },
    cantidad: {
        type: String,
        required: true
    },
    unidadMedida: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    importe: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Request', RequestSchema)