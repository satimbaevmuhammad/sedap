const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  title: String,
  img: String,
  type: String,
  name: String
});

module.exports = mongoose.model('Food', foodSchema);
