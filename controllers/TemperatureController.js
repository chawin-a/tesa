// var mongoose = require("mongoose");
var Temperature = require("../models/Temperature");

var temperatureController = {};

// Show list of temperature
temperatureController.list = function(req, res) {
  Temperature.find({}).exec(function (err, temperature) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/temperature/index", {temperature: temperature});
    }
  });
};

// Show temperature by id
temperatureController.show = function(req, res) {
  Temperature.findOne({_id: req.params.id}).exec(function (err, temperature) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/temperature/show", {temperature: temperature});
    }
  });
};

// Create new temperature
temperatureController.create = function(req, res) {
  res.render("../views/temperature/create");
};

// Save new temperature
temperatureController.save = function(req, res) {
  var temperature = new Temperature(req.body);

  temperature.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/temperature/create");
    } else {
      console.log("Successfully created an temperature.");
      res.redirect("/temperature/show/"+temperature._id);
    }
  });
};

// Edit an temperature
temperatureController.edit = function(req, res) {
  Temperature.findOne({_id: req.params.id}).exec(function (err, temperature) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/temperature/edit", {temperature: temperature});
    }
  });
};

// Update an temperature
temperatureController.update = function(req, res) {
  Temperature.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, temperature) {
    if (err) {
      console.log(err);
      res.render("../views/temperature/edit", {temperature: req.body});
    }
    res.redirect("/temperature/show/"+temperature._id);
  });
};

// Delete an temperature
temperatureController.delete = function(req, res) {
  Temperature.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Temperature deleted!");
      res.redirect("/temperature");
    }
  });
};

module.exports = temperatureController;
