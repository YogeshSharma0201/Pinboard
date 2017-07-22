var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  twitter: {
    id: String,
    displayName: String,
    username: String,
    imageUrl: String
  }
});

module.exports = mongoose.model('User', userSchema);
