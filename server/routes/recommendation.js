const express = require("express");
const axios = require("axios");
const router = express.Router();

// Use environment variable with fallback to localhost for Flask URL
const FLASK_URL = process.env.FLASK_API_URL || "http://localhost:5000";

// This environment variable should be set in your Render backend settings

router.post("/", async (req, res) => {
  try {
    const result = await axios.post(`${FLASK_URL}/api/recommend`, req.body);
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: "ML API Error" });
  }
});

module.exports = router;
