const fs = require("fs");
var employees=[];
var departments=[];

module.exports.initialize=function(){
var readfilee = new Promise(
    function(resolve,reject){
        try{
            fs.readFile('./data/employees.json', 'utf8', (err, data) => {
                if (err) throw err;
                employees = JSON.parse(data);

           });

        fs.readFile("./data/departments.json",'utf8',(err,data) => {
            if(err) throw err;
            departments = JSON.parse(data);
        });

           resolve("sucssesful")
           
        }
        
        catch(ex){reject("unable to read the file"+ex.message)}

        
    }
)
return readfilee;
}

module.exports.getAllEmployees=function(){
   var getAllEmployees= new Promise(
        function(resolve,reject){
            
                if(employees.length>0){
                    resolve(employees);
                }else{reject("no results returned");}
            
        }


    )

        return getAllEmployees;


    
}

module.exports.getManagers=function(){
var getManagers=new Promise(function(resolve,reject){
        if(employees.length>0){
            var out = employees.filter(function(x){return x.isManager == true});
            resolve(out);
        }else{
            reject("no results returned");
        }

 
})
return getManagers;
}

module.exports.getDepartments=function(){
var department = new Promise(function(resolve,reject){
    if(departments.length>0){
        resolve(departments)
    }else{
        reject("no results returned");
    }

})

return department;
}

