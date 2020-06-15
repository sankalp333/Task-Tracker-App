const express = require("express");
const bodyParser = require("body-parser");

const lodash = require("lodash");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let tasksList = [];
let totalTasks = 0;
let completedTasks = 0;

app.get("/", function(req, res) {

  // res.send("Hello World!");
  res.render("home", {
    tasksList: tasksList
  });
});

app.get("/add", function(req, res) {

  res.render("add");
});

app.get("/status", function(req, res){

  res.render("status", {totalTasks: totalTasks, completedTasks: completedTasks});
});

app.post("/details/:taskName", function(req, res){

  tasksList.forEach(task => {

    if(lodash.lowerCase(task.title) == lodash.lowerCase(req.params.taskName)){

      res.render("details", {task: task});
    }
  });
});

app.post("/delete/:taskName", function(req, res) {

  tasksList.forEach(task => {

    if (lodash.lowerCase(task.title) == lodash.lowerCase(req.params.taskName)) {

      completedTasks++;
      //console.log(tasksList.indexOf(task));
      let index = tasksList.indexOf(task);

      if (index > -1) {
        tasksList.splice(index, 1);
      }

      return true;
    }

  });
  res.redirect("/");
});

app.post("/add", function(req, res) {

  totalTasks++;
  tasksList.push({
    title: req.body.title,
    description: req.body.description
  });
  res.redirect("/");
});


app.listen(3000, function() {

  console.log("Started Listening on Port 3000...")
});
