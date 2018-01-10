var express = require('express');
var request = require('request');
var Temperature = require('../models/Temperature');
var router = express.Router();
var temperature = require("../controllers/TemperatureController.js");

// Get all temperature
router.get('/', function(req, res) {
  temperature.list(req, res);
});

router.get('/get', function(req, res) {
    request('http://10.0.0.10/api/temperature/29/all', function(error, res, body) {
        var data = JSON.parse(body);
        // console.log(body);
        // console.log(data);
        for(var i=0;i<data["data"].length;i++) {
            var q = new Temperature(data["data"][i]);
            q.save(function(err) {
                if(err) {
                    console.log(err);
                }
            })
        }
    })
});

// Get single temperature by id
router.get('/show/:id', function(req, res) {
  temperature.show(req, res);
});

// Create temperature
router.get('/create', function(req, res) {
  temperature.create(req, res);
});

// Save temperature
router.post('/save', function(req, res) {
  temperature.save(req, res);
});

// Edit temperature
router.get('/edit/:id', function(req, res) {
  temperature.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  temperature.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  temperature.delete(req, res);
});

module.exports = router;
