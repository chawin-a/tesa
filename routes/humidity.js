var express = require('express');
var request = require('request');
var Humidity = require('../models/Humidity');
var router = express.Router();
var humidity = require("../controllers/HumidityController.js");

// Get all humidity
router.get('/', function(req, res) {
  humidity.list(req, res);
});

router.get('/get', function(req, res) {
    request('http://10.0.0.10/api/humidity/29', function(error, res, body) {
        var data = JSON.parse(body);
        // console.log(body);
        // console.log(data);
        for(var i=0;i<data["data"].length;i++) {
            var q = new Humidity(data["data"][i]);
            q.save(function(err) {
                if(err) {
                    console.log(err);
                }
            })
        }
    })
});

// Get single humidity by id
router.get('/show/:id', function(req, res) {
  humidity.show(req, res);
});

// Create humidity
router.get('/create', function(req, res) {
  humidity.create(req, res);
});

// Save humidity
router.post('/save', function(req, res) {
  humidity.save(req, res);
});

// Edit humidity
router.get('/edit/:id', function(req, res) {
  humidity.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  humidity.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  humidity.delete(req, res);
});

module.exports = router;
