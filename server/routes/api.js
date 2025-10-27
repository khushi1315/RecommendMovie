import express from "express";
import axios from "axios";

const router = express.Router();
const FLASK_API_URL = "https://recommendmovie-flask.onrender.com";

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API_URL}/recommend`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    res.status(500).json({ error: "Failed to fetch recommendation" });
  }
});

export default router;
