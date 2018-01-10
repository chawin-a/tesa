// var mongoose = require("mongoose");
var Magnetometer = require("../models/Magnetometer");

var magnetometerController = {};

// Show list of magnetometer
magnetometerController.list = function(req, res) {
  Magnetometer.find({}).exec(function (err, magnetometer) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/magnetometer/index", {magnetometer: magnetometer});
    }
  });
};

// Show magnetometer by id
magnetometerController.show = function(req, res) {
  Magnetometer.findOne({_id: req.params.id}).exec(function (err, magnetometer) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/magnetometer/show", {magnetometer: magnetometer});
    }
  });
};

// Create new magnetometer
magnetometerController.create = function(req, res) {
  res.render("../views/magnetometer/create");
};

// Save new magnetometer
magnetometerController.save = function(req, res) {
  var magnetometer = new Magnetometer(req.body);

  magnetometer.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/magnetometer/create");
    } else {
      console.log("Successfully created an magnetometer.");
      res.redirect("/magnetometer/show/"+magnetometer._id);
    }
  });
};

// Edit an magnetometer
magnetometerController.edit = function(req, res) {
  Magnetometer.findOne({_id: req.params.id}).exec(function (err, magnetometer) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/magnetometer/edit", {magnetometer: magnetometer});
    }
  });
};

// Update an magnetometer
magnetometerController.update = function(req, res) {
  Magnetometer.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, magnetometer) {
    if (err) {
      console.log(err);
      res.render("../views/magnetometer/edit", {magnetometer: req.body});
    }
    res.redirect("/magnetometer/show/"+magnetometer._id);
  });
};

// Delete an magnetometer
magnetometerController.delete = function(req, res) {
  Magnetometer.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Magnetometer deleted!");
      res.redirect("/magnetometer");
    }
  });
};

module.exports = magnetometerController;
