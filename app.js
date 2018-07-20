var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require('./seeds');

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create(
//   {
//     name: "Salmon Creek",
//     image: "https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg",
//     description: "The very best Salmon you will ever find at a campground. The bears love it! And you will too."
//   }, function(err, campg){
//     if (err) {
//       console.log("Error!!!!");
//       console.log(err);
//     } else {
//       console.log("New created campground");
//       console.log(campg);
//     }
// });

app.get("/", function(req, res){
  res.render("landing")
});

// INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: allCampgrounds})
      console.log(allCampgrounds);
    }
  });
  // res.render("campgrounds", {campgrounds: campgrounds})
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
  // Get data from form and create an object with the data
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  // Create new campground from object and send to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    } else {
      // Redirect back to campgrounds page
      res.redirect("/campgrounds")
    }
  });
});

// NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

// SHOW - shows more information about one campground
app.get("/campgrounds/:id", function(req, res){
  // Render show template for campground
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground})
    }
  });
});

app.listen(3000, function(){
  console.log("Yelp Camp server is now running :)");
});
