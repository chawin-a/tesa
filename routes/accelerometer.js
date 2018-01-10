var express = require('express');
var request = require('request');
var Accelerometer = require('../models/Accelerometer');
var router = express.Router();
var accelerometer = require("../controllers/AccelerometerController.js");

// Get all accelerometer
router.get('/', function(req, res) {
  accelerometer.list(req, res);
});

router.get('/get', function(req, res) {
    request('http://10.0.0.10/api/accelerometer/29', function(error, res, body) {
        var data = JSON.parse(body);
        // console.log(body);
        // console.log(data);
        for(var i=0;i<data["data"].length;i++) {
            var q = new Accelerometer(data["data"][i]);
            q.save(function(err) {
                if(err) {
                    console.log(err);
                }
            })
        }
    })
});

// Get single accelerometer by id
router.get('/show/:id', function(req, res) {
  accelerometer.show(req, res);
});

// Create accelerometer
router.get('/create', function(req, res) {
  accelerometer.create(req, res);
});

// Save accelerometer
router.post('/save', function(req, res) {
  accelerometer.save(req, res);
});

// Edit accelerometer
router.get('/edit/:id', function(req, res) {
  accelerometer.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  accelerometer.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  accelerometer.delete(req, res);
});

module.exports = router;
