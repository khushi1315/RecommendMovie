const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const users = require('./users'); // adjust path if needed


router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, error: 'Email and password required' });

  const user = users[email];
  if (!user)
    return res.status(400).json({ success: false, error: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ success: false, error: 'Invalid password' });

  res.json({ success: true });
});

module.exports = router;
