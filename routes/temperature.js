var express = require('express');
var request = require('../function/request-async');
var Temperature = require('../models/Temperature');
var router = express.Router();
var temperature = require("../controllers/TemperatureController.js");

var urls = require('../config/urls');

// Get all temperature
router.get('/', function (req, res) {
  temperature.list(req, res);
});

router.get('/get', function (req, res) {
  var requestData = [];
  for (var i = 0; i < urls.teams; i++) {
    requestData.push(request(urls.url + 'temperature/' + urls.teamID[i] + '/2', urls.teamID[i]));
  }
  Promise.all(requestData)
    .then(function (output) {
      var updated = [];
      for (var i = 0; i < output.length; i++) {
        var d = JSON.parse(output[i].body);
        if (d["statusCode"] != "00") continue;
        for (var j = 0; j < d["data"].length; j++) {
          var obj = d["data"][j];
          obj["TeamID"] = output[i].TeamID;
          updated.push(Temperature.update({sensID: obj.sensID}, obj, {upsert: true}, function(err, raw) {
            if(err) console.log(err);
          }));
        }
      }
      return Promise.all(updated);
    })
    .then(function () {
      res.redirect("/temperature");
    })
});

module.exports = router;
