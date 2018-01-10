// var mongoose = require("mongoose");
var Gyroscope = require("../models/Gyroscope");

var gyroscopeController = {};

// Show list of gyroscope
gyroscopeController.list = function(req, res) {
  Gyroscope.find({}).exec(function (err, gyroscope) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/gyroscope/index", {gyroscope});
    }
  });
};

// Show gyroscope by id
gyroscopeController.show = function(req, res) {
  Gyroscope.findOne({_id: req.params.id}).exec(function (err, gyroscope) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/gyroscope/show", {gyroscope});
    }
  });
};

gyroscopeController.create = function(req, res) {
  res.render("../views/gyroscope/create");
};

gyroscopeController.save = function(req, res) {
  var gyroscope = new Gyroscope(req.body);

  gyroscope.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/gyroscope/create");
    } else {
      console.log("Successfully created an gyroscope.");
      res.redirect("/gyroscope/show/"+gyroscope._id);
    }
  });
};

// Edit an gyroscope
gyroscopeController.edit = function(req, res) {
  Gyroscope.findOne({_id: req.params.id}).exec(function (err, gyroscope) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/gyroscope/edit", {gyroscope: gyroscope});
    }
  });
};

// Update an gyroscope
gyroscopeController.update = function(req, res) {
  Gyroscope.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, gyroscope) {
    if (err) {
      console.log(err);
      res.render("../views/gyroscope/edit", {gyroscope: req.body});
    }
    res.redirect("/gyroscope/show/"+gyroscope._id);
  });
};

// Delete an gyroscope
gyroscopeController.delete = function(req, res) {
  Gyroscope.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Gyroscope deleted!");
      res.redirect("/gyroscope");
    }
  });
};

module.exports = gyroscopeController;
