var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

  username: String,

  password: String,

  level: Number

});

module.exports = mongoose.model('User', UserSchema);
