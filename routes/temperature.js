var express = require('express');
var request = require('../function/request-async');
var Temperature = require('../models/Temperature');
var router = express.Router();
var temperature = require("../controllers/TemperatureController.js");

var urls = require('../config/urls');

// Get all temperature
router.get('/', function(req, res) {
  temperature.list(req, res);
});

router.get('/get', function(req, res) {
  var requestData = [];
  for(var i=1;i<=urls.teams;i++) {
    requestData.push(request(urls.url + 'temperature/' + i + '/1'));
  }
  Promise.all(requestData)
  .then(function(data) {
    for(var i=0;i<data.length;i++) {
      var d = JSON.parse(data[i]);
      if(d["statusCode"] != "00") continue;
      var obj = d["data"][0];
      obj["TeamID"] = i+1;
      var q = new Temperature(obj);
      q.save();
    }
  })
  .then(function() {
    res.redirect("/temperature");
  })
});

module.exports = router;
