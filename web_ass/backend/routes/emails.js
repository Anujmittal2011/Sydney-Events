const express = require('express');
const router = express.Router();
const Email = require('../models/Email');

router.post('/', async (req, res) => {  // use '/' here, not '/emails'
  const { username, email, eventId } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const newEmail = new Email({ username, email, eventId });
    await newEmail.save();
    res.status(201).json({ message: 'Email saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
