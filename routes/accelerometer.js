var express = require('express');
var request = require('../function/request-async');
var Accelerometer = require('../models/Accelerometer');
var router = express.Router();
var accelerometer = require("../controllers/AccelerometerController.js");

var urls = require('../config/urls');

// Get all accelerometer
router.get('/', function (req, res) {
  accelerometer.list(req, res);
});

router.get('/get', function (req, res) {
  var requestData = [];
  for (var i = 0; i < urls.teams; i++) {
    requestData.push(request(urls.url + 'accelerometer/' + urls.teamID[i] + '/2', urls.teamID[i]));
  }
  Promise.all(requestData)
    .then(function (output) {
      console.log(output);
      var updated = [];
      for (var i = 0; i < output.length; i++) {
        var d = JSON.parse(output[i].body);
        if (d["statusCode"] != "00") continue;
        for (var j = 0; j < d["data"].length; j++) {
          var obj = d["data"][j];
          obj["TeamID"] = output[i].TeamID;
          updated.push(Accelerometer.update({sensID: obj.sensID}, obj, {upsert: true}, function(err, raw) {
            if(err) console.log(err);
          }));
        }
      }
      return Promise.all(updated);
    })
    .then(function () {
      res.redirect("/accelerometer");
    })
});

module.exports = router;
