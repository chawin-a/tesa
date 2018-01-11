var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:1q2w3e4r@localhost:27017/tgr2018test', { useMongoClient: true })
  .then(() => {
    console.log('connection succesful')
  })
  .catch((err) => console.error(err));

var sensors = [require('./models/Temperature'), require('./models/Accelerometer'), require('./models/Din1'), require('./models/Predict')];
mongoose.connection.on('open', function () {
  var drop = [];
  for (var i = 0; i < sensors.length; i++) {
    drop.push(sensors[i].remove());
  }
  Promise.all(drop).then(() => console.log("Init Database"))
  .then(() => mongoose.connection.close());
})

