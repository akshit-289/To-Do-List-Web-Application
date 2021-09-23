//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/views/date.js");

const app = express();
var items = [];
var workItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))

app.get("/", function(req, res) {

  let day = date.getDate();
  res.render("list", {listTitle: day, addTask: items});
});

app.post("/", function(req,res) {
  if(req.body.button === "Work"){
  workItems.push(req.body.task);
  console.log(req.body);
  res.redirect("/work");
  }
  else{
  items.push(req.body.task);
    console.log(req.body);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", addTask: workItems});
})

app.post("/work", function(req, res) {
  let item = req.body.task;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", function(req,res) {
  res.render("about");
})

app.listen(3000, function(){
  console.log("Server started on 3000");
});
