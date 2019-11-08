const mongoose = require('mongoose')
const {Scheema} = mongoose

const OrderSchema = new OrderSchema({
    cuatri: {
        type: String,
        required: true
    },
    fecha_soli: {
        type: String,
        required: true
    },
    fecha_entre: {
        type: String,
        required: true
    },
    tiempo: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    servicio: {
        type: String,
        required: true
    },
    finan: {
        type: String,
        require: true
    },
    resul: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Order', OrderSchema)