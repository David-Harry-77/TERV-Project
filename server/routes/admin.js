const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Task = require('../models/task');
const config = require('../config');

const router = express.Router();

// Middleware to verify token and admin role
router.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided');

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token');
    if (decoded.role !== 'admin') return res.status(403).send('Requires admin role');
    req.userId = decoded.id;
    next();
  });
});

// Create task for student
router.post('/task', async (req, res) => {
  const { title, description, studentId } = req.body;
  const task = new Task({ title, description, studentId });
  await task.save();
  res.json(task);
});

module.exports = router;
