const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get current user info
router.get('/user', async (req, res) => {
  if (!req.session.userId) return res.status(401).send('Not logged in');
  const user = await User.findById(req.session.userId);
  res.json({
    username: user.username,
    currentLink: user.currentLink,
    linkHistory: user.linkHistory
  });
});

// Update link
router.put('/update-link', async (req, res) => {
  if (!req.session.userId) return res.status(401).send('Not logged in');
  const { newLink } = req.body;
  const user = await User.findById(req.session.userId);
  user.currentLink = newLink;
  user.linkHistory.push({ link: newLink });
  await user.save();
  res.sendStatus(200);
});

module.exports = router;
