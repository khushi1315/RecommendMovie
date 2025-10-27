const express = require("express");
const cors = require("cors");
const axios = require("axios"); // ✅ required for Flask API call

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ no need for bodyParser separately

// Flask API base URL
const FLASK_API_URL = "https://recommendmovie-flask.onrender.com";

// ✅ Route to forward recommendation requests to Flask
app.post("/api/recommend", async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API_URL}/recommend`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    res.status(500).json({ error: "ML service error" });
  }
});

// Other routes
app.use("/api/movies", require("./routes/movies"));
app.use("/api/users", require("./routes/users"));
app.use("/api/ratings", require("./routes/rating"));
const path = require("path");

// Serve frontend
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
