const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const recommendRoute = require('./routes/recommendation');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/recommend', recommendRoute);

// Routes
app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));
app.use('/api/ratings', require('./routes/rating'));
// app.use('/api/recommendation', require('./routes/recommendation'));

// const axios = require('axios');
const FLASK_API_URL = "https://recommendmovie-flask.onrender.com";
app.use(express.json());
app.post('/api/recommend', async (req, res) => {
  
  const userData = req.body;
  try {
    const response = await axios.post(`${FLASK_API_URL}/recommend`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'ML service error' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));