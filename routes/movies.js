const express = require('express');
const router = express.Router();

// Get all movies
router.get('/', (req, res) => {
    res.json({ message: 'Get all movies' });
});

// Get movie by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get movie ${req.params.id}` });
});

module.exports = router;