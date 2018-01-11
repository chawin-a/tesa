// var mongoose = require("mongoose");
var Din1 = require("../models/Din1");

var din1Controller = {};

// Show list of din1
din1Controller.list = function(req, res) {
  Din1.find({}).exec(function (err, din1) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/din1/index", {din1: din1});
    }
  });
};

// Show din1 by id
din1Controller.show = function(req, res) {
  Din1.findOne({_id: req.params.id}).exec(function (err, din1) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/din1/show", {din1: din1});
    }
  });
};

// Create new din1
din1Controller.create = function(req, res) {
  res.render("../views/din1/create");
};

// Save new din1
din1Controller.save = function(req, res) {
  var din1 = new Din1(req.body);

  din1.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/din1/create");
    } else {
      console.log("Successfully created an din1.");
      res.redirect("/din1/show/"+din1._id);
    }
  });
};

// Edit an din1
din1Controller.edit = function(req, res) {
  Din1.findOne({_id: req.params.id}).exec(function (err, din1) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/din1/edit", {din1: din1});
    }
  });
};

// Update an din1
din1Controller.update = function(req, res) {
  Din1.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, din1) {
    if (err) {
      console.log(err);
      res.render("../views/din1/edit", {din1: req.body});
    }
    res.redirect("/din1/show/"+din1._id);
  });
};

// Delete an din1
din1Controller.delete = function(req, res) {
  Din1.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Din1 deleted!");
      res.redirect("/din1");
    }
  });
};

module.exports = din1Controller;
