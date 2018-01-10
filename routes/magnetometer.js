var express = require('express');
var request = require('request');
var Magnetometer = require('../models/Magnetometer');
var router = express.Router();
var magnetometer = require("../controllers/MagnetometerController.js");

// Get all magnetometer
router.get('/', function(req, res) {
  magnetometer.list(req, res);
});

router.get('/get', function(req, res) {
    request('http://10.0.0.10/api/magnetometer/29', function(error, res, body) {
        var data = JSON.parse(body);
        // console.log(body);
        // console.log(data);
        for(var i=0;i<data["data"].length;i++) {
            var q = new Magnetometer(data["data"][i]);
            q.save(function(err) {
                if(err) {
                    console.log(err);
                }
            })
        }
    })
});

// Get single magnetometer by id
router.get('/show/:id', function(req, res) {
  magnetometer.show(req, res);
});

// Create magnetometer
router.get('/create', function(req, res) {
  magnetometer.create(req, res);
});

// Save magnetometer
router.post('/save', function(req, res) {
  magnetometer.save(req, res);
});

// Edit magnetometer
router.get('/edit/:id', function(req, res) {
  magnetometer.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  magnetometer.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  magnetometer.delete(req, res);
});

module.exports = router;
