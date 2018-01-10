var express = require('express');
var request = require('request');
var Gyroscope = require('../models/Gyroscope');
var router = express.Router();
var gyroscope = require("../controllers/GyroscopeController.js");

// Get all gyroscope
router.get('/', function(req, res) {
  gyroscope.list(req, res);
});

router.get('/get', function(req, res) {
    request('http://10.0.0.10/api/gyroscope/29', function(error, res, body) {
        var data = JSON.parse(body);
        // console.log(body);
        // console.log(data);
        for(var i=0;i<data["data"].length;i++) {
            var q = new Gyroscope(data["data"][i]);
            q.save(function(err) {
                if(err) {
                    console.log(err);
                }
            })
        }
    })
});

// Get single gyroscope by id
router.get('/show/:id', function(req, res) {
  gyroscope.show(req, res);
});

// Create gyroscope
router.get('/create', function(req, res) {
  gyroscope.create(req, res);
});

// Save gyroscope
router.post('/save', function(req, res) {
  gyroscope.save(req, res);
});

// Edit gyroscope
router.get('/edit/:id', function(req, res) {
  gyroscope.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  gyroscope.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  gyroscope.delete(req, res);
});

module.exports = router;
