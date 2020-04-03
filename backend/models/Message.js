const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;