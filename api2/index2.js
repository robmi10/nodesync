const express = require ('express');
const app = express ();
const customer = require('./customers2')
const bodyParser = require('body-parser')

const auth_key = "example-api-key-2"
app.use(bodyParser.json())

let port = 7000

app.use('/api/v1/customer', function(req,res, next){
    if(req.header('authorization') !== auth_key){
        return res.status(403).json({error: "No credential sent"})
    }
    next()
})

app.get('/api/v1/customer', function(req,res ){
    try{
        var customer_list = customer.All_customer()
        res.status(200).json({"Suceed": customer_list})
    }
    catch{
        res.status(404).json({error: "error"})
    }
})

app.post('/api/v1/customer', function(req,res ){
    try{
        customer.Create_customer(req.body.name, req.body.company, req.body.id)
        res.status(200).json({"Suceed": req.body})
    }
    catch{
        res.status(404).json({error: "error"})
    }
})

app.put('/api/v1/customer', function(req,res){
    try{
        var result = customer.Index_customer(req.body.name, req.body.company, req.body.id)
        res.status(200).json({"Suceed": result})
    }
    catch{
        res.status(404).json({error: "error"})
    }
    
})

app.delete('/api/v1/customer', function(req,res){
    try{
        var result = customer.Delete_customer(req.body.id)
        res.status(200).json({"Suceed": result})
    }
    catch{
        res.status(404).json({error: "error"})
    }
})

app.get('/api/v1/customer/filter', function(req,res ){
    try{
        var filter_list = customer.Filter_customer(req.body.name, req.body.company, req.body.id, req.body.offset, req.body.limit)
        res.status(200).json({"Suceed": filter_list})
    }
    catch{
        res.status(404).json({error: "error"})
    }
})

app.listen(port, () =>{
    console.log("Server is running on", port)
})