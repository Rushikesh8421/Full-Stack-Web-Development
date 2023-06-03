const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")
const app = express();

let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/",(req,res)=>{
    
    let day = date.getDate();
    res.render("list",{listTitle:day,addNewItems:items});

});

app.post("/",(req,res)=>{

    let item = req.body.newItem

    if(req.body.list === "Work List")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"Work List",addNewItems:workItems});
});

app.post("/work",(req,res)=>{
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about",(req,res)=>{
    res.render("about");
})


app.listen(3000, function(){
    console.log("Server is running at port 3000");
});