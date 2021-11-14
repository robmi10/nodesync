const fetch = require('node-fetch')

const Post_api = async(name, company, id) =>{
    try
    {
    console.log("inside post api")
    const requestOption ={
        method: 'POST',
        headers: {'Authorization': "example-api-key-2", 'Content-Type': 'application/json'},
        body: JSON.stringify({"name": name, "company": company, "id": id})
    }
     await fetch("http://localhost:7000/api/v1/customer", requestOption);
    }
    catch (error){
        console.log("error -->", error)
    }
}

const Put_api = async(name, company, id) =>{
    try
    {
    const requestOption ={
        method: 'PUT',
        headers: {'Authorization': "example-api-key-2", 'Content-Type': 'application/json'},
        body: JSON.stringify({"name": name, "company": company, "id": id})
    }
     await fetch("http://localhost:7000/api/v1/customer", requestOption);
    }
    catch (error){
        console.log("error -->", error)
    }
}

const Delete_api = async(id) =>{
    try
    {
    const requestOption ={
        method: 'DELETE',
        headers: {'Authorization': "example-api-key-2", 'Content-Type': 'application/json'},
        body: JSON.stringify({"id": id})
    }
     await fetch("http://localhost:7000/api/v1/customer", requestOption);
    }
    catch (error){
        console.log("error -->", error)
    }
}

exports.Post_api = Post_api;
exports.Put_api = Put_api;
exports.Delete_api = Delete_api;