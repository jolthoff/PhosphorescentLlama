var mongoose = require('mongoose');

var SequencerSchema = new mongoose.Schema({

  data: String,

  level: Number

});

module.exports = mongoose.model('Sequencer', SequencerSchema);

