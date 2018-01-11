var mongoose = require('mongoose');

var PredictSchema = new mongoose.Schema({
    TeamID: String,
    Description: String,
    date: { type: Date, default: Date.now },
    T
  });

module.exports = mongoose.model('Predict', PredictSchema);