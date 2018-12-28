var express = require('express');
var app = express();
var data = [];
const url = 'https://randomuser.me/api';
const axios = require('axios');

// api use 8080 port
app.listen(8080,()=>{console.log("Server running on port 8080");});

// hold get request with "/users" 
app.get("/users",(req, res, next)=>{
    res.statusCode = 200;
    asyreq().then((arr)=>{res.json(data);console.log(data.length);});    
});

// hold post request with "/users"
app.post("/users",(req, res, next)=>{
    var text ={ "message": "User successfully created!" };
    res.statusCode = 201;
    asyreq().then((arr)=>{res.json(text);console.log(data.length);});    
});


//hold get request to find user in memory.
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

//function to retrieve data from 3rd party API
const getUser = function(response){
    if(response.status==200){
       var user_ = new Object();
       var results = response.data.results[0];
       var objectKeysArray = Object.keys(results);
       setUpUser(objectKeysArray,results,user_);
       return user_;
    }
    else{
        return null;
    }
    
}

async function asyreq() {
// 10 asynchronous requests 
    for(var i=0;i<10;i++){
    let userInfo = await axios.get(url).then(getUser);
        if(null != userInfo){
            data.push(userInfo);
        }
        else{
            i = i-1;
        }
    }
    return data;
}

//get user property from json array and set up the user object 
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