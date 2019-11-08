const express = require('express');
const router = express.Router();

 const Order = require('../models/order')

 router.get('/', async (req,res)=>{
    const orders = await Order.find();
    res.json(orders);
 });
 
 router.get('/:id', async (req,res)=>{
     const order = await Order.findById(req.params.id);
     res.json(order);
 });
 
 router.post('/', async (req,res)=>{
     const {cuatri,fecha_soli,fecha_entre,tiempo,precio,servicio,
            finan,resul}= req.body;
     const orders = new Order({cuatri,fecha_soli,fecha_entre,tiempo,precio,servicio,
        finan,resul});
     await orders.save();
     res.json({status:'Tarea Guardada'});
 });
 
 router.put('/:id', async (req, res)=>{
     const {cuatri,fecha_soli,fecha_entre,tiempo,precio,servicio,
        finan,resul} = req.body;
     const newOrder ={cuatri,fecha_soli,fecha_entre,tiempo,precio,servicio,
        finan,resul};
     await Order.findByIdAndUpdate(req.params.id, newOrder);
     res.json({status:'Orden Actualizada'});
 });
 
 router.delete('/:id', async (req, res)=>{
    await Order.findByIdAndRemove(req.params.id);
    res.json({status:'Orden Eliminada'})
 });

module.exports = router;