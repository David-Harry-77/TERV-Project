const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');
const config = require('../config');

const router = express.Router();

// Middleware to verify token and student role
router.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided');

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token');
    if (decoded.role !== 'student') return res.status(403).send('Requires student role');
    req.userId = decoded.id;
    next();
  });
});

// Get tasks for student
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find({ studentId: req.userId });
  res.json(tasks);
});

module.exports = router;
