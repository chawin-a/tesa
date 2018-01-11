var express = require('express');
var request = require('../function/request-async');
var Accelerometer = require('../models/Accelerometer');
var router = express.Router();
var accelerometer = require("../controllers/AccelerometerController.js");

var urls = require('../config/urls');

// Get all accelerometer
router.get('/', function(req, res) {
  accelerometer.list(req, res);
});

router.get('/get', function(req, res) {
  var requestData = [];
  for(var i=1;i<=urls.teams;i++) {
    requestData.push(request(urls.url + 'accelerometer/' + i + '/1'));
  }
  Promise.all(requestData)
  .then(function(data) {
    for(var i=0;i<data.length;i++) {
      var d = JSON.parse(data[i]);
      if(d["statusCode"] != "00") continue;
      var obj = d["data"][0];
      obj["TeamID"] = i+1;
      var q = new Accelerometer(obj);
      q.save();
    }
  })
  .then(function() {
    res.redirect("/accelerometer");
  })
});

module.exports = router;
