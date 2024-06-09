const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../config');

const router = express.Router();

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).send('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, config.secret, { expiresIn: '1h' });
  res.json({ token });
});

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password, role, adminId } = req.body;

  if (role === 'student') {
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== 'admin') {
      return res.status(400).send('Invalid admin ID');
    }

    const studentCount = await User.countDocuments({ adminId });
    if (studentCount >= 10) {
      return res.status(400).send('Admin cannot have more than 10 students');
    }
  }

  const user = new User({ email, password, role, adminId: role === 'student' ? adminId : undefined });
  await user.save();
  res.status(201).send('User created successfully');
});

module.exports = router;
