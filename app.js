var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//  Schema setup

var campgroundSchema = new mongoose.Schema({
  name: String,
  img: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Salmon Creek",
//     img: "https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg"
//   }, function(err, campg){
//     if (err) {
//       console.log("Error!!!!");
//       console.log(err);
//     } else {
//       console.log("New created campground");
//       console.log(campg);
//     }
//   })

// var campgrounds = [
//   { name: "Salmon Creek", img: "https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg" },
//   { name: "Granite Hill", img: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f7c17aa2efb5_340.jpg" },
//   { name: "Mountain Bear's Rest", img: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg" },
//   { name: "Snow Hills", img: "https://farm8.staticflickr.com/7402/12934040253_63e555afa2.jpg" },
//   { name: "Dark Horse", img: "https://farm8.staticflickr.com/7023/6439728971_eb870e486b.jpg" },
//   { name: "Green Meadows", img: "https://farm4.staticflickr.com/3187/2671132585_898aa8c500.jpg" },
//   { name: "High Point", img: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg" },
//   { name: "Shade Gates", img: "http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx" },
//   { name: "Leafy Salts", img: "http://www.travelbirbilling.com/wp-content/uploads/camp-pic1.jpg" },
// ];

app.get("/", function(req, res){
  res.render("landing")
});

app.get("/campgrounds", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds})
    }
  });
  // res.render("campgrounds", {campgrounds: campgrounds})
});

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, img: image};
  // Create new campground and send to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    } else {
      // Redirect back to campgrounds page
      res.redirect("/campgrounds")
    }
  });
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

app.listen(3000, function(){
  console.log("Yelp Camp server is now running :)");
});
