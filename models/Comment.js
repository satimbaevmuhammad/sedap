const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  description: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ball: String,
  date: String
});

module.exports = mongoose.model('Comment', commentSchema);
