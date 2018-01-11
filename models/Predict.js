var mongoose = require('mongoose');

var PredictSchema = new mongoose.Schema({
    TeamID: String,
    elephen: Number,
    fire: Number,
    tree: Number,
    normal: Number,
    date: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Predict', PredictSchema);