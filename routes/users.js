const express = require('express');
const router = express.Router();

// Get user profile
router.get('/profile', (req, res) => {
    res.json({ message: 'Get user profile' });
});

// Update user preferences
router.post('/preferences', (req, res) => {
    res.json({ message: 'Update preferences' });
});

module.exports = router;