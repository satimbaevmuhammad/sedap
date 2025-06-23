const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: String,
  balance: String,
  photo: String,
  work: String,
  location: String,
  orders: Array,
  favouriteItems: Array,
  email: String,
  password: String,
  mostorders: Array
});

module.exports = mongoose.model('User', userSchema);
