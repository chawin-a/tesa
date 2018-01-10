var mongoose = require('mongoose');

var PressureSchema = new mongoose.Schema({
    sensID: String,
    val: String,
    //date: String,
    date: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Pressure', HumiditySchema);

  