const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  date: String, // format: "26 March 2020, 12:42 AM"
  customerName: String,
  location: String,
  amount: Number,
  status: String,
  category: String
});

module.exports = mongoose.model('Order', orderSchema);
