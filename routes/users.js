const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();

// GET /users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    // Find user by ID with age > 21
    const user = await User.findOne({ 
      _id: id, 
      age: { $gt: 21 } 
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found or age is 21 or below' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;