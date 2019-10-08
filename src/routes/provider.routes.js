const express = require('express')
const router = express.Router()

const Provider = require('../models/provider')

router.get('/', async (req, res) => {
    const providers = await Provider.find()
    res.json(providers)
})

router.get('/:id', async (req, res) => {
    const provider = await Provider.findById(req.params.id)
    res.json(provider)
})

router.post('/', async (req, res) => {
    const {name, rfc, address, phone, contact, email, classification, result} = req.body
    const provider = new Provider({name, rfc, address, phone, contact, email, classification, result})
    await provider.save()
    res.json({status: 'Provider saved'})
})

router.put('/:id', async (req, res) => {
    const {name, rfc, address, phone, contact, email, classification, result} = req.body
    const newProvider = {name, rfc, address, phone, contact, email, classification, result}
    await Provider.findByIdAndUpdate(req.params.id, newProvider)
    res.json({status: 'Provider updated'})
})

router.delete('/:id', async (req, res) => {
    await Provider.findByIdAndRemove(req.params.id)
    res.json({status: 'Provider deleted'})
})

module.exports = router