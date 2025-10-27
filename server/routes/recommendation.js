const express = require("express");
const axios = require("axios");
const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     // Forward request to ML Flask backend (Python API)
//   const result = await axios.post("http://localhost:5001/recommend", req.body);

//     res.json(result.data);
//   } catch (err) {
//     res.status(500).json({ error: "ML API Error" });
//   }
// });
const FLASK_URL = process.env.FLASK_URL; // set this in your Render backend env settings

router.post("/", async (req, res) => {
  try {
    const result = await axios.post(`${FLASK_URL}/recommend`, req.body);
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: "ML API Error" });
  }
});


module.exports = router;
