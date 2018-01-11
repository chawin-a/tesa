var express = require('express');
var request = require('request');
var Din1 = require('../models/Din1');
var router = express.Router();
var din1 = require("../controllers/Din1Controller.js");

// Get all din1
router.get('/', function(req, res) {
  din1.list(req, res);
});

router.get('/get', function(req, res) {
    request('http://10.0.0.10/api/din1/29', function(error, res, body) {
        var data = JSON.parse(body);
        // console.log(body);
        // console.log(data);
        for(var i=0;i<data["data"].length;i++) {
            var q = new Din1(data["data"][i]);
            q.save(function(err) {
                if(err) {
                    console.log(err);
                }
            })
        }
    })
});

// Get single din1 by id
router.get('/show/:id', function(req, res) {
  din1.show(req, res);
});

// Create din1
router.get('/create', function(req, res) {
  din1.create(req, res);
});

// Save din1
router.post('/save', function(req, res) {
  din1.save(req, res);
});

// Edit din1
router.get('/edit/:id', function(req, res) {
  din1.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  din1.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  din1.delete(req, res);
});

module.exports = router;
