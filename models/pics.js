var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pic = new Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/.test(v);
      },
      message: '{VALUE} is not a valid url!'
    }
  },
  broken: {
    type: Boolean,
    default: false
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  owenerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  likers: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Pic', Pic);
