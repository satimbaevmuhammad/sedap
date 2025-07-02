const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,             // Masalan: "Spicy Nugget"
  date: String,              // Masalan: "2021-04-02"
  startTime: String,         // Masalan: "08:04"
  endTime: String,           // Masalan: "10:23"
  status: String,            // Masalan: "Pass", "New Event"
  color: String,             // UI da rang berish uchun (ixtiyoriy)
  description: String,       // Qo‘shimcha izoh (ixtiyoriy)
  moreCount: Number          // "+3 more" kabi ko‘rsatish uchun
});

module.exports = mongoose.model('Event', eventSchema);
