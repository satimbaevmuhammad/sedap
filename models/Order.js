const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  img: String,
  quanlity: Number,
  price: Number,
  totalPrice: Number,
  menuSections: String,
  productName: String,
  reviews: Number,
  rating: Number
}, { _id: false });

const deliverSchema = new mongoose.Schema({
  deliverName: String,
  deliverID: Number,
  deliverNumber: String,
  deliverTime: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderID: String, // "#5552351"
  date: String, // "26 March 2020, 12:42 AM"
  customerName: String, // "Mikasa Ackerman"
  location: String, // "Corner Street 5th London"
  totalPrice: Number, // 164.52
  statusOrder: String, // "New Order"
  userSatus: String, // "Customer"
  orderItems: [orderItemSchema],
  deliver: deliverSchema
});

module.exports = mongoose.model('Order', orderSchema);
