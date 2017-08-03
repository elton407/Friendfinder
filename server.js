// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
 var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
var appUsers = [];

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

console.log("jsworking");

app.use(express.static(__dirname + '/app'));


app.get("/", function(req, res) {

res.sendFile(path.join(__dirname, "app/public/home.html"));
//res.sendFile(path.join(__dirname, "app/public/style.css"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/all", function(req, res) {
  res.json(appUsers);
});

app.post("/api/new", function(req, res) {
  var newcharacter = req.body;
  //newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  fs.appendFile("log.txt",  JSON.stringify(newcharacter, null, 2) , function(err) {

  // If the code experiences any errors it will log the error to the console.
  if (err) {
    return console.log(err);
  }

  // Otherwise, it will print: "movies.txt was updated!"
  console.log("log.txt was updated!");

});
  
  appUsers.push(newcharacter);
  console.log(newcharacter);
  console.log(appUsers)

  

  res.json(newcharacter);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

