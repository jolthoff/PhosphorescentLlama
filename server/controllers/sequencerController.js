var Sequencer = require('../models/sequencerModel.js');

module.exports = {

  // get data from database by making POST request
  getData: function (req, res, level) {
    Sequencer.find({level: level}, function(err, sequencer) {
      if (err) return console.error(err);
      res.send(sequencer);
      console.dir(sequencer);
    });
  },

  // save data to database by making GET request
  saveData: function(req, res) {
    var data = "???";
    var level = "???";

    var sequencer = new Sequencer({
      data: data,
      level: level
    });

    sequencer.save(function (err, sequencer) {
      if (err) return console.error(err);
      else console.log('Saved : ', sequencer);
    });

    res.status(201).end();
  }

};
