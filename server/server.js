const cors = require("cors");
const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
// Serve React build
app.use(express.static(path.resolve(__dirname, "../client/build")));
// Middlewares (always first)
app.use(cors());
app.use(express.json());

// Routers
app.use("/api", require("./routes/api"));
app.use("/api/movies", require("./routes/movies"));
app.use('/api/users', require('./routes/userRoutes')); 
app.use("/api/ratings", require("./routes/rating"));
app.use("/api", require("./routes/signup"));

app.use("/api/login", require('./routes/login'));

// Flask URL
const FLASK_API_URL = "https://recommendmovie-flask.onrender.com";

// Flask forward
app.post("/api/recommend", async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API_URL}/api/recommend`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    res.status(500).json({ error: "ML service error" });
  }
});



app.use((req, res, next) => {
  if (
    req.path.startsWith('/api') ||
    req.path.match(/\.[^\/]+$/)
  ) return next();
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
