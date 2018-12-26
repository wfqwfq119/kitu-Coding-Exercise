var express = require('express');
var app = express();
var data = [];
const url = 'https://randomuser.me/api';
const axios = require('axios');


app.listen(8080,()=>{console.log("Server running on port 8080");});
app.get("/users",(req, res, next)=>{
    res.statusCode = 200;
    asyreq().then((arr)=>{res.json(data);console.log(data.length);});    
});
app.post("/users",(req, res, next)=>{
    var text ={ "message": "User successfully created!" };
    res.statusCode = 201;
    asyreq().then((arr)=>{res.json(text);console.log(data.length);});    
});

app.get("/users/firstname/:firstname",(req, res, next)=>{
    let param = req.params;
    let firstname = param.firstname;
    let boo = false;
    data.forEach((element)=>{
        if(element.firstname == firstname){
            boo = true;
            res.statusCode = 200;
            res.json(element);
        }
    }); 
    if(!boo){
    let errmess = { "message": "User not found! "} ;
    res.statusCode = 404;
    res.json(errmess);
    }   
});


const getUser = function(response){
    if(response.status==200){
       var user_ = new Object();
       var results = response.data.results[0];
       var objectKeysArray = Object.keys(results);
       setUpUser(objectKeysArray,results,user_);
    }
    return user_;
}

async function asyreq() {
// 10 asynchronous requests 
    for(var i=0;i<10;i++){
    let value3 = await axios.get(url).then(getUser);
    data.push(value3);
    }
    return data;
}

function setUpUser(arr,results,user_){
    arr.forEach(function(objKey) {
        switch (objKey) {
            case 'gender':
                user_.gender = results[objKey];
                break;
            case 'cell':
                user_.cell = results[objKey];
                break;
            case 'email':
                user_.email = results[objKey];
                break;
            case 'location':
                user_.city = results[objKey].city;
                break;
            case 'name':
                user_.firstname = results[objKey].first;
                break;
        }    
    })
}