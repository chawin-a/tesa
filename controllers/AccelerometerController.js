// var mongoose = require("mongoose");
var Accelerometer = require("../models/Accelerometer");

var accelerometerController = {};

// Show list of accelerometer
accelerometerController.list = function(req, res) {
  Accelerometer.find({}).exec(function (err, data) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/accelerometer/index", {data});
    }
  });
};

// Show accelerometer by id
accelerometerController.show = function(req, res) {
  Accelerometer.findOne({_id: req.params.id}).exec(function (err, data) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/accelerometer/show", {data});
    }
  });
};

accelerometerController.create = function(req, res) {
  res.render("../views/accelerometer/create");
};

accelerometerController.save = function(req, res) {
  var accelerometer = new Accelerometer(req.body);

  accelerometer.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/accelerometer/create");
    } else {
      console.log("Successfully created an accelerometer.");
      res.redirect("/accelerometer/show/"+accelerometer._id);
    }
  });
};

// Edit an accelerometer
accelerometerController.edit = function(req, res) {
  Accelerometer.findOne({_id: req.params.id}).exec(function (err, accelerometer) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/accelerometer/edit", {accelerometer: accelerometer});
    }
  });
};

// Update an accelerometer
accelerometerController.update = function(req, res) {
  Accelerometer.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, accelerometer) {
    if (err) {
      console.log(err);
      res.render("../views/accelerometer/edit", {accelerometer: req.body});
    }
    res.redirect("/accelerometer/show/"+accelerometer._id);
  });
};

// Delete an accelerometer
accelerometerController.delete = function(req, res) {
  Accelerometer.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Accelerometer deleted!");
      res.redirect("/accelerometer");
    }
  });
};

module.exports = accelerometerController;
