var express = require("express");
var app = express();

var campgrounds = [
  { name: "Salmon Creek", img: "https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg" },
  { name: "Granite Hill", img: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f7c17aa2efb5_340.jpg" },
  { name: "Mountain Bear's Rest", img: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg" },
]

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing")
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds})
});


app.listen(3000, function(){
  console.log("Yelp Camp server is now running :)");
});
