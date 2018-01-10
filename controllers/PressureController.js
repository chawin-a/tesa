// var mongoose = require("mongoose");
var Pressure = require("../models/Pressure");

var pressureController = {};

// Show list of pressure
pressureController.list = function(req, res) {
  Pressure.find({}).exec(function (err, pressure) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/pressure/index", {pressure: pressure});
    }
  });
};

// Show pressure by id
pressureController.show = function(req, res) {
  Pressure.findOne({_id: req.params.id}).exec(function (err, pressure) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/pressure/show", {pressure: pressure});
    }
  });
};

// Create new pressure
pressureController.create = function(req, res) {
  res.render("../views/pressure/create");
};

// Save new pressure
pressureController.save = function(req, res) {
  var pressure = new Pressure(req.body);

  pressure.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/pressure/create");
    } else {
      console.log("Successfully created an pressure.");
      res.redirect("/pressure/show/"+pressure._id);
    }
  });
};

// Edit an pressure
pressureController.edit = function(req, res) {
  Pressure.findOne({_id: req.params.id}).exec(function (err, pressure) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/pressure/edit", {pressure: pressure});
    }
  });
};

// Update an pressure
pressureController.update = function(req, res) {
  Pressure.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, pressure) {
    if (err) {
      console.log(err);
      res.render("../views/pressure/edit", {pressure: req.body});
    }
    res.redirect("/pressure/show/"+pressure._id);
  });
};

// Delete an pressure
pressureController.delete = function(req, res) {
  Pressure.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Pressure deleted!");
      res.redirect("/pressure");
    }
  });
};

module.exports = pressureController;
