const express = require ('express');
const app = express ();
const customer = require('./customers')
const bodyParser = require('body-parser')
const sync = require('./sync')

const auth_key = "example-api-key-1"

let port = 6000

app.use(bodyParser.json())

//Middleware that first checks if the request is authorized.
app.use('/api/v1/customer', function(req,res, next){
    if(req.header('authorization') !== auth_key){
        return res.status(403).json({error: "No credential sent"})
    }
    bodyParser.json()
    next();
})
//Returns the list that contains all the customer objects.
app.get('/api/v1/customer', function(req,res ){
    try{
        var customer_list = customer.All_customer()
        res.status(200).json({"Suceed": customer_list})
    }
    catch{
        res.status(404).json({error: "error"})
    }
    
})
/* Creates a new customer object and inserting it to the list, 
and synchronizes with the second API by posting the data to it.*/
app.post('/api/v1/customer', function(req,res ){
    try{
        customer.Create_customer(req.body.name, req.body.company, req.body.id)
        sync.Post_api(req.body.name, req.body.company, req.body.id)
        res.status(200).json({"Suceed": req.body})
    }
    catch{
        res.status(404).json({error: "error"})
    }
 
})
/* Updates a customer object and synchronizes with the second API by posting the updated data to it.*/
app.put('/api/v1/customer', function(req,res){
    try{
        var result = customer.Index_customer(req.body.name, req.body.company, req.body.id)
        sync.Put_api(req.body.name, req.body.company, req.body.id)
        res.status(200).json({"Suceed": result})
    }
    catch{
        res.status(404).json({error: "error"})
    }
    
})
/* Deletes a specific customer object and synchronizes with the second API by posting the deleted object data to it.*/
app.delete('/api/v1/customer', function(req,res){
    try{
        var result = customer.Delete_customer(req.body.id)
        sync.Delete_api(req.body.id)
        res.status(200).json({"Suceed": result})
    }
    catch{
        res.status(404).json({error: "error"})
    }
    
})
/*Filters through the array and depending on the user request it will return a specific filter of the Customer list*/
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