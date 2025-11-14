const express = require("express");
const axios = require("axios");
const router = express.Router();


const FLASK_URL = "https://recommendmovie-flask.onrender.com/";
 // set this in your Render backend env settings

router.post("/", async (req, res) => {
  try {
    const result = await axios.post(`${FLASK_URL}/api/recommend`, req.body);
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: "ML API Error" });
  }
});


module.exports = router;
