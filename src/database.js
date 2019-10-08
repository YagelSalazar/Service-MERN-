const mongoose = require('mongoose')

const URI = 'mongodb://localhost/PurchasingProcess'

mongoose.connect(URI)
    .then(db => console.log('Database connected'))
    .catch(err => console.log(err))

module.exports = mongoose