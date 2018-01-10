var mongoose = require('mongoose');

var TemperatureSchema = new mongoose.Schema({
    sensID: String,
    val: String,
    //date: String,
    date: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('Temparature', TemperatureSchema);