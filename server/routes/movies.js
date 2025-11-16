

const express = require('express');
const router = express.Router();
const axios = require('axios');

const FLASK_API_URL = "https://recommendmovie-flask.onrender.com";

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_API_URL}/api/movies`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movie list:", error.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

module.exports = router;
