const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: String,
    joinDate: Date,
    name: String,
    location: String,
    totalSpent: Number,
    lastOrder: Number,
    email: String,
    phone: String,
    company: String,
    address: String,
    profileImage: String,
    balance: Number,
    cardNumber: String,
    cardExpiry: String,
    profession: String,
    mostOrderedFood: [
        {
            id: Number,
            name: String,
            category: String,
            price: Number,
            serves: String,
            time: String,
            image: String,
            orderCount: Number
        }
    ],
    mostLikedFood: {
        totalLikes: Number,
        date: String,
        weeklyData: [
            {
                day: String,
                spaghetti: Number,
                pizza: Number,
                burger: Number,
                sprite: Number
            }
        ],
        categories: [
            {
                name: String,
                percentage: Number,
                count: Number,
                color: String
            }
        ]
    }
});

module.exports = mongoose.model('Customer', customerSchema);
