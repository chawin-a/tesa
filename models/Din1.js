var mongoose = require('mongoose');

var Din1Schema = new mongoose.Schema({
    sensID: String,
    val: String,
    //date: String,
    date: { type: Date, default: Date.now },
    TeamID: String,
  });

module.exports = mongoose.model('Din1', Din1Schema);