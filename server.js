var dataserver = require("./data-service.js");
var departments = require("./data/departments");
var employees = require("./data/employees");
var path = require("path");
var express = require("express");
var app = express();
app.use(express.static('public')); 
var HTTP_PORT = process.env.port || 8080 ;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup another route to listen on /about
app.get("/about", function(req,res){
   res.sendFile(path.join(__dirname,"/views/about.html"));
   
});

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   res.sendFile(path.join(__dirname,"/views/home.html"));
 });

//returining employees 

app.get("/employees", function(req,res){
   dataserver.getAllEmployees()
   .then(function(data){res.json(data);})
   .catch(function(error){res.json(error)})
});

//returning departments
app.get("/departments",function(req,res){
   dataserver.getDepartments()
   .then((data)=>{res.json(data)})
   .catch((error)=>{res.json(error)})
 
})


//returning managers
app.get("/managers",function(req,res){
  dataserver.getManagers()
  .then((data)=>{res.json(data)})
  .catch((error)=>{res.json(error)})
})

//error handeling 
app.use((req,res)=>{
   res.status(404).send("PAGE NOT FOUND");
});


// setup http server to listen on HTTP_PORT


dataserver.initialize()
.then(()=>{app.listen(HTTP_PORT,onHttpStart);})
.catch(err=>{console.log(err);})
