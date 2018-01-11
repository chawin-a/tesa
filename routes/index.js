var express = require('express');
var router = express.Router();

var Temperature = require('../models/Temperature')
var Accelerometer = require('../models/Accelerometer')
var Din1 = require('../models/Din1')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TESA' });
});

router.get('/allTeamSensor/:start/:end/', function(req, res, next) {
  var start = Number(req.params.start / 100).toFixed(2).toString().split('.');
  var end = Number(req.params.end / 100).toFixed(2).toString().split('.');
  var startTime = new Date();
  var endTime = new Date();
  startTime.setDate(11);
  startTime.setHours(start[0]);
  startTime.setMinutes(start[1]);
  startTime.setSeconds(0);
  endTime.setDate(11);
  endTime.setHours(end[0]);
  endTime.setMinutes(end[1]);
  endTime.setSeconds(0);
  console.log(startTime, endTime);
  Promise.all([
    Temperature.find({}).where('date').gte(startTime).lt(endTime).exec(),
    Accelerometer.find({}).where('date').gte(startTime).lt(endTime).exec(),
    Din1.find({}).where('date').gte(startTime).lt(endTime).exec()
  ])
  .then(output => {
    var obj = {};
    obj["Temperature"] = [];
    for(var i=0;i<output[0].length;i++) {
      var temp = {};
      temp["val"] = output[0][i]["val"];
      temp["teamID"] = output[0][i]["TeamID"];
      temp["date"] = output[0][i]["date"];
      obj["Temperature"].push(temp);
    }
    obj["Accelerometer"] = [];
    for(var i=0;i<output[1].length;i++) {
      var temp = {};
      temp["val_x"] = output[1][i]["val_x"];
      temp["val_y"] = output[1][i]["val_y"];
      temp["val_z"] = output[1][i]["val_z"];
      temp["teamID"] = output[1][i]["TeamID"];
      temp["date"] = output[1][i]["date"];
      obj["Accelerometer"].push(temp);
    }
    obj["Din1"] = [];
    for(var i=0;i<output[2].length;i++) {
      var temp = {};
      temp["val"] = output[2][i]["val"];
      temp["teamID"] = output[2][i]["TeamID"];
      temp["date"] = output[2][i]["date"];
      obj["Din1"].push(temp);
    }
    res.send(obj);
  })
})

module.exports = router;
