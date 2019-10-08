const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')

const {mongoose} = require('./database')

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/providers', require('./routes/provider.routes'))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
})