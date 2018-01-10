// var mongoose = require("mongoose");
var Humidity = require("../models/Humidity");

var humidityController = {};

// Show list of humidity
humidityController.list = function(req, res) {
  Humidity.find({}).exec(function (err, humidity) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/humidity/index", {humidity: humidity});
    }
  });
};

// Show humidity by id
humidityController.show = function(req, res) {
  Humidity.findOne({_id: req.params.id}).exec(function (err, humidity) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/humidity/show", {humidity: humidity});
    }
  });
};

// Create new humidity
humidityController.create = function(req, res) {
  res.render("../views/humidity/create");
};

// Save new humidity
humidityController.save = function(req, res) {
  var humidity = new Humidity(req.body);

  humidity.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/humidity/create");
    } else {
      console.log("Successfully created an humidity.");
      res.redirect("/humidity/show/"+humidity._id);
    }
  });
};

// Edit an humidity
humidityController.edit = function(req, res) {
  Humidity.findOne({_id: req.params.id}).exec(function (err, humidity) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/humidity/edit", {humidity: humidity});
    }
  });
};

// Update an humidity
humidityController.update = function(req, res) {
  Humidity.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, humidity) {
    if (err) {
      console.log(err);
      res.render("../views/humidity/edit", {humidity: req.body});
    }
    res.redirect("/humidity/show/"+humidity._id);
  });
};

// Delete an humidity
humidityController.delete = function(req, res) {
  Humidity.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Humidity deleted!");
      res.redirect("/humidity");
    }
  });
};

module.exports = humidityController;
