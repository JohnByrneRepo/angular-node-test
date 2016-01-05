// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Log = new Schema({
  ip: String,
  datetime: Number,
  action: String,
  username: String
});

Log.plugin(passportLocalMongoose);

module.exports = mongoose.model('log', Log);
