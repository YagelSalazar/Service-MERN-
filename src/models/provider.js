const mongoose = require('mongoose')
const {Schema} = mongoose

const ProviderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rfc: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Provider', ProviderSchema)