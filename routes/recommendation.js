const express = require('express');
const router = express.Router();

// Get movie recommendations
router.get('/', (req, res) => {
    res.json({ message: 'Get recommendations' });
});

// Get personalized recommendations
router.get('/personalized', (req, res) => {
    res.json({ message: 'Get personalized recommendations' });
});

module.exports = router;