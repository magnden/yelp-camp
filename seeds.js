var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');


var data = [
    {
      name: "Weston Pass",
      image: "https://images.unsplash.com/photo-1529968493954-06bbf3fdacc2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b1e4a7957538f7c335ef1c8499d44d0&auto=format&fit=crop&w=1050&q=80",
      description:"Weston Pass Campgrounds offers families a parking space and a tenting area."
    },
    {
      name: "Yosemite Valley",
      image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=1050&q=80",
      description:"Weston Pass Campgrounds offers families a parking space and a tenting area."
    },
    {
      name: "Goat Rocks",
      image: "https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=053f91dd9aee1cc7bc5cafca28cb625c&auto=format&fit=crop&w=1050&q=80",
      description:"Goat Rocks Wilderness offers many camping possibilities. It's a very beautiful rock that is a \"must camp\" sort of place."
    },
    {
      name: "South Carlsbad State Beach Campground",
      image: "https://images.unsplash.com/photo-1487793800082-f840b37f3ce1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3b843bea090583e414c3db1411a92467&auto=format&fit=crop&w=1138&q=80",
      description: "South Carlsbad is a warm and sunny beach campsite."
    }
]

function seedDB(){
  // Remove all campgrounds
  Campground.remove({}, function(err){
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds!");
    // Add in new campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground!");
          // Create a comment
          Comment.create(
            {
              text: "This place is good, but I couldn't get any internet.",
              author: "Jack"
            }, function(err, comment){
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("created a new comment");
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
