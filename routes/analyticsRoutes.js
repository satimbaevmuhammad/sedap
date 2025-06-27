const express = require('express');
const router = express.Router();
const moment = require('moment');

const Order = require('../models/Order');
const Food = require('../models/Food');

// Helpers
const getPeriodStart = (period) => {
  switch (period) {
    case 'daily': return moment().startOf('day');
    case 'weekly': return moment().startOf('isoWeek');
    case 'monthly': return moment().startOf('month');
    default: return moment().startOf('day');
  }
};

// Orders: daily/weekly/monthly stats
const getSalesStats = async (period) => {
  const fromDate = getPeriodStart(period);
  const orders = await Order.find({
    createdAt: { $gte: fromDate.toDate() }
  });

  const totalSales = orders.reduce((sum, o) => sum + o.amount, 0);
  const chart = [];

  if (period === 'daily') {
    for (let h = 0; h < 24; h++) {
      const hourSales = orders
        .filter(o => moment(o.createdAt).hour() === h)
        .reduce((sum, o) => sum + o.amount, 0);
      chart.push({ label: `${h.toString().padStart(2, '0')}:00`, value: hourSales });
    }
  } else if (period === 'weekly') {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let i = 0; i < 7; i++) {
      const daySales = orders
        .filter(o => moment(o.createdAt).isoWeekday() === i + 1)
        .reduce((sum, o) => sum + o.amount, 0);
      chart.push({ label: days[i], value: daySales });
    }
  } else if (period === 'monthly') {
    const months = moment.monthsShort();
    for (let m = 0; m < 12; m++) {
      const monthSales = orders
        .filter(o => moment(o.createdAt).month() === m)
        .reduce((sum, o) => sum + o.amount, 0);
      chart.push({ label: months[m], value: monthSales });
    }
  }

  const avgSalesPerDay = period === 'daily' ? totalSales : Math.round(totalSales / chart.length);
  return { totalSales, avgSalesPerDay, chart };
};

// Mock: most selling & trending from Food (randomly sorted)
const getMostSellingItems = async () => {
  const items = await Food.find().limit(5);
  return items.map((item, i) => ({
    id: i + 1,
    name: item.title,
    category: item.type,
    price: (Math.random() * 10 + 5).toFixed(2),
    sales: Math.floor(Math.random() * 50 + 10),
    image: item.img
  }));
};

const getTrendingItems = async () => {
  const items = await Food.find().limit(5);
  return items.map((item, i) => ({
    id: 100 + i,
    name: item.title,
    category: item.type,
    sales: Math.floor(Math.random() * 500 + 100),
    monthly: Math.floor(Math.random() * 300 + 100),
    weekly: Math.floor(Math.random() * 100 + 20),
    daily: Math.floor(Math.random() * 30 + 5),
    change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 5).toFixed(1) + '%',
    trend: Math.random() > 0.5 ? 'up' : 'down',
    img: item.img
  }));
};

const getFavouriteItems = async () => {
  const items = await Food.find().limit(6);
  return items.map((item, i) => ({
    id: 200 + i,
    name: item.title,
    likes: Math.floor(Math.random() * 5000 + 1000),
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 500 + 100),
    image: item.img
  }));
};

// Main analytics endpoint
router.get('/', async (req, res) => {
  try {
    const [daily, weekly, monthly] = await Promise.all([
      getSalesStats('daily'),
      getSalesStats('weekly'),
      getSalesStats('monthly'),
    ]);

    const [mostSellingItems, trendingItems, favouriteItems] = await Promise.all([
      getMostSellingItems(),
      getTrendingItems(),
      getFavouriteItems()
    ]);

    const totalRevenue = monthly.totalSales;

    res.json({
      orders: { daily, weekly, monthly },
      mostSellingItems,
      trendingItems,
      favouriteItems,
      revenue: {
        totalRevenue,
        daily,
        weekly,
        monthly
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Xatolik yuz berdi', error: err.message });
  }
});

module.exports = router;
