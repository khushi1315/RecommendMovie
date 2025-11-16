const express = require('express');
const router = express.Router();

// Simple in-memory ratings store
let demoRatings = [];

router.post('/', (req, res) => {
    // ratings: { movieId: score, ... }
    const { ratings } = req.body;
    demoRatings = ratings;
    res.json({ success: true });
});

// Optionally: send ratings to Flask backend to train/test ML

router.get('/', (req, res) => {
    res.json({ ratings: demoRatings });
});

module.exports = router;
