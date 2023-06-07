const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const { name } = require("ejs");
const app = express();

// let items = ["Buy Food","Cook Food","Eat Food"];
// let workItems = [];

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('todolist', itemSchema);

const item1 = new Item({
    name: 'Welcome to your todolist'
});
const item2 = new Item({
    name: 'Hello'
});
const item3 = new Item({
    name: 'World'
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List",listSchema);



main().catch(err => console.error(err));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", (req, res) => {

    Item.find({})
    .then(foundItems => {

        if(foundItems.length === 0){
            Item.insertMany(defaultItems)
            .then(() => {
                console.log('Successfully saved default items to DB');
            })
            .catch(err => {
                console.error(err);
            });
            res.redirect("/");
        }else{
            res.render("list", { listTitle: "Today", addNewItems: foundItems });
        }
     
    })
    .catch(error => {
      console.error(error);
    });

});

app.post("/", (req, res) => {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name:itemName
    });

    if(listName == "Today"){
        item.save();
    res.redirect("/");
    }
    else{
        List.findOne({ name: listName })
        .then(foundList => {
            foundList.items.push(item); 
                foundList.save();
                res.redirect("/"+listName);
      })
      .catch(error => {
        console.error(error);
      });
    }

    
});

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){
        Item.findOneAndDelete({ _id: checkedItemId })
      .then(() => {
        res.redirect("/");
      })
      .catch(error => {
        console.error(error);
      });
    }else{
        List.findOneAndUpdate(
            { name: listName },
            { $pull: { items: { _id: checkedItemId } } }
          )
            .then(() => {
              res.redirect("/" + listName);
            })
            .catch((err) => {
              console.log(err);
            });
    }

  });

  app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);
  
    List.findOne({ name: customListName })
      .then(foundList => {
        if (!foundList) {
            const list = new List({
                name: customListName,
                items: defaultItems
              });
              list.save();
              res.redirect("/"+customListName);
        } else {
          res.render("list",{listTitle:foundList.name,addNewItems: foundList.items})
        }
      })
      .catch(error => {
        console.error(error);
      });
  
    
  
    
  });
  
  
app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", addNewItems: workItems });
});

app.post("/work", (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", (req, res) => {
    res.render("about");
})


app.listen(3000, function () {
    console.log("Server is running at port 3000");
});