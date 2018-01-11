var express = require('express');
var request = require('../function/request-async');
var Din1 = require('../models/Din1');
var router = express.Router();
var din1 = require("../controllers/Din1Controller.js");

var urls = require('../config/urls');

// Get all din1
router.get('/', function(req, res) {
  din1.list(req, res);
});

router.get('/get', function(req, res) {
  var requestData = [];
  for(var i=1;i<=urls.teams;i++) {
    requestData.push(request(urls.url + 'din1/' + i + '/1'));
  }
  Promise.all(requestData)
  .then(function(data) {
    for(var i=0;i<data.length;i++) {
      var d = JSON.parse(data[i]);
      if(d["statusCode"] != "00") continue;
      var obj = d["data"][0];
      obj["TeamID"] = i+1;
      var q = new Din1(obj);
      q.save();
    }
  })
  .then(function() {
    res.redirect("/din1");
  })
});

module.exports = router;