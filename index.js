var express  = require("express");
var app = express();
var todos_db = require("./seed.js");
var bodyParser = require("body-parser");


//console.log(todos_db);
// app.use("/",function(req,res,next){
//     console.log("REQUEST");
//     console.log(req.url);
//     console.log(req.method);
//      next();
// });

app.use("/",express.static(__dirname+"/public"));

//use http methods put,get,delete,post for sturturing your file

//1.get all todos
// "/api/todos is an endpoint

app.use("/",bodyParser.urlencoded({extended : false}));

app.get("/api/todos",function(req,res){

    res.json(todos_db.todos);

});

app.get("/api/todos/active",function(req,res){
    var size = Object.keys(todos_db).length;
    var objs = {};
    console.log(size);
    // for(var i = 1;i<=size;i++){
    //     var current = todos_db.todos[i];
    //     if(current.status=="ACTIVE"){
    //        objs[i]=current;
    //         console.log(objs);
    //     }
    // }

    Object.keys(todos_db.todos).forEach(function(current){
        //console.log(current);
        if(todos_db.todos[current].status==todos_db.StatusEnums.ACTIVE){
             objs[current]=todos_db.todos[current];
            //console.log(current);
        }
    })

    res.json(objs);

});

app.get("/api/todos/complete",function(req,res){
    // var size = Object.keys(todos_db).length;
    var objs = {};

    // for(var i = 1;i<=size;i++){
    //     var current = todos_db.todos[i];
    //     if(current.status=="COMPLETE"){
    //         objs[i]=current;
    //         console.log(objs);
    //     }
    // }

    Object.keys(todos_db.todos).forEach(function(current){
        //console.log(current);
        if(todos_db.todos[current].status==todos_db.StatusEnums.COMPLETE){
            objs[current]=todos_db.todos[current];
            //console.log(current);
        }
    })


    res.json(objs);

});

app.get("/api/todos/deleted",function(req,res){
    // var size = Object.keys(todos_db).length;
    // console.log(size);
    var objs = {};

    // for(var i = 1;i<=size;i++){
    //     var current = todos_db.todos[i];
    //     if(current.status=="DELETED"){
    //         objs[i]=current;
    //         console.log(objs);
    //     }
    // }

    Object.keys(todos_db.todos).forEach(function(current){
        //console.log(current);
        if(todos_db.todos[current].status==todos_db.StatusEnums.DELETED){
            objs[current]=todos_db.todos[current];
            //console.log(current);
        }
    })

    res.json(objs);

});

app.post("/api/todos",function(req,res){

    var todo = req.body.todo_title;

    if(!todo || todo=="" || todo.trim() == ""){
        res.status(400).json({error:"Title can't be empty"});
    }else{
        var new_todo = {
            title:todo,
            status : todos_db.StatusEnums.ACTIVE,
        };

        todos_db.todos[todos_db.next_todo_id] = new_todo;
        todos_db.next_todo_id = todos_db.next_todo_id + 1;

        res.json(todos_db.todos);
    }
});

app.put("/api/todos/:id",function(req,res){

    var modId = req.params.id;
    var modobj = todos_db.todos[modId];

    if(!modobj){
        res.status(400).json({"error":"Todo doesn't exist"});
    }
    else{

       var newtitle = req.body.title;
       var newstatus = req.body.status;

        console.log(newtitle + newstatus);
       if(newtitle && newtitle!="" && newtitle.trim() != ""){
           modobj.title = newtitle;
       }
       if(newstatus && (newstatus == "ACTIVATED" || newstatus == "COMPLETE")){
           modobj.status = newstatus;
       }

        res.json(todos_db.todos);
    }
});

app.put("/api/todos/complete/:id",function (req,res) {
    var modId = req.params.id;
    var modobj = todos_db.todos[modId];

    if (!modobj) {
        res.status(400).json({"error": "Todo doesn't exist"});
    }
    else {

        if(modobj.status == todos_db.StatusEnums.COMPLETE){
            modobj.status = todos_db.StatusEnums.ACTIVE;
        }else if(modobj.status == todos_db.StatusEnums.ACTIVE){
            modobj.status = todos_db.StatusEnums.COMPLETE;
        }
        res.json(todos_db.todos);

    }
});

app.put("/api/todos/active/:id",function (req,res) {

    var modId = req.params.id;
    var modobj = todos_db.todos[modId];

    if (!modobj) {
        res.status(400).json({"error": "Todo doesn't exist"});
    }
    else {

        modobj.status = todos_db.StatusEnums.ACTIVE;
        res.json(todos_db.todos);
    }
});

app.delete("/api/todos/:id",function(req,res){

    var delId = req.params.id;
    var delObject = todos_db.todos[delId];

    if(!delObject){
        res.status(400).json({"error":"Todo doesn't exist"});
    }
    else{
        delObject.status = todos_db.StatusEnums.DELETED;
        res.json(todos_db.todos);
    }
});

app.listen(4000);