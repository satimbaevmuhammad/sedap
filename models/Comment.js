const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  img: String,
  title: String,
  category: String,
  description: String,
  author: {
    name: String,
    position: String,
    avatar: String
  },
  ball: String,
  date: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // <-- Add this line
});

module.exports = mongoose.model('Comment', commentSchema);
