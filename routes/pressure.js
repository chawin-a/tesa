var express = require('express');
var request = require('request');
var Pressure = require('../models/Pressure');
var router = express.Router();
var pressure = require("../controllers/PressureController.js");

// Get all pressure
router.get('/', function(req, res) {
  pressure.list(req, res);
});

router.get('/get', function(req, res) {
    request('http://10.0.0.10/api/pressure/29', function(error, res, body) {
        var data = JSON.parse(body);
        // console.log(body);
        // console.log(data);
        for(var i=0;i<data["data"].length;i++) {
            var q = new Pressure(data["data"][i]);
            q.save(function(err) {
                if(err) {
                    console.log(err);
                }
            })
        }
    })
});

// Get single pressure by id
router.get('/show/:id', function(req, res) {
  pressure.show(req, res);
});

// Create pressure
router.get('/create', function(req, res) {
  pressure.create(req, res);
});

// Save pressure
router.post('/save', function(req, res) {
  pressure.save(req, res);
});

// Edit pressure
router.get('/edit/:id', function(req, res) {
  pressure.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  pressure.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  pressure.delete(req, res);
});

module.exports = router;
