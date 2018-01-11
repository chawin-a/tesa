var mongoose = require('mongoose');

var TemperatureSchema = new mongoose.Schema({
    sensID: String,
    val: String,
    //date: String,
    date: { type: Date, default: Date.now },
    TeamID: String,
  });

  module.exports = mongoose.model('Temperature', TemperatureSchema);