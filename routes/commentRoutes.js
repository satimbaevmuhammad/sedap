const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// GET all comments
router.get('/', async (req, res) => {
  const comments = await Comment.find().populate('user_id'); // foydalanuvchi ma'lumotlarini ham olib kelish
  res.json(comments);
});

// POST new comment
router.post('/', async (req, res) => {
  const newComment = new Comment(req.body);
  await newComment.save();
  res.status(201).json(newComment);
});

module.exports = router;
