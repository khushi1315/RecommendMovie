const express = require('express');
const router = express.Router();

// Get all ratings
router.get('/', (req, res) => {
    res.json({ message: 'Get all ratings' });
});

// Add a new rating
router.post('/', (req, res) => {
    res.json({ message: 'Add new rating' });
});

// Update a rating
router.put('/:id', (req, res) => {
    res.json({ message: `Update rating ${req.params.id}` });
});

// Delete a rating
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete rating ${req.params.id}` });
});

module.exports = router;