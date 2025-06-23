const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// GET all foods
router.get('/', async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

// POST new food
router.post('/', async (req, res) => {
  const newFood = new Food(req.body);
  await newFood.save();
  res.status(201).json(newFood);
});

module.exports = router;
