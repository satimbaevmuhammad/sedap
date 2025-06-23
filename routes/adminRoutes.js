const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// GET all admins
router.get('/', async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
});

// POST new admin
router.post('/', async (req, res) => {
  const newAdmin = new Admin(req.body);
  await newAdmin.save();
  res.status(201).json(newAdmin);
});

module.exports = router;
