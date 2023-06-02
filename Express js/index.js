const express = require("express");
const path = require("path");
const app = express();
const port  = 3000;

app.use(express.static(path.join(__dirname,'public')));

app.get("/hello/:name",function(req,res){
    // res.sendFile(path.join(__dirname,"index.html"));
    res.send("hello"+ req.params.name);
});

app.get("/about",(req,res)=>{
    
    res.json({'Rushikesh':100});
});

app.listen(port,function(){
    console.log(`Example app listening on port ${port}`)
});
