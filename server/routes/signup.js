const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // for password hashing
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const fs = require('fs');


// Simple in-memory store (replace with DB later)
const users = require('./users'); 
// Load OAuth credentials (web type)
const credentials = JSON.parse(fs.readFileSync('oauth-credentials.json'));
const oAuth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Use your Gmail refresh token here
oAuth2Client.setCredentials({
  refresh_token: '1//0gX8yjLfi_I2UCgYIARAAGBASNwF-L9IrEj_02jdf3e2pKPiTstnR6zMvQhmgO2W5Sf4QfeFlzQygu3twL3EUxzqvDKKDOhNKJg4'
});

// Function to send password reset email
async function sendMail(email, resetLink) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'khushi21092509@gmail.com', // Gmail address used for OAuth
        clientId: credentials.web.client_id,
        clientSecret: credentials.web.client_secret,
        refreshToken: '1//0gX8yjLfi_I2UCgYIARAAGBASNwF-L9IrEj_02jdf3e2pKPiTstnR6zMvQhmgO2W5Sf4QfeFlzQygu3twL3EUxzqvDKKDOhNKJg4',
        accessToken: accessToken.token
      }
    });

    const mailOptions = {
      from: 'khushi21092509@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Click this link to reset your password: ${resetLink}`
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending mail:', error);
    return false;
  }
}

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, error: 'Email and password are required' });

  if (users[email]) 
    return res.status(400).json({ success: false, error: 'User already exists' });

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    users[email] = { email, password: hashedPassword };
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }
  console.log('Forgot password requested for email:', email);

  if (!users[email]) {
    return res.json({ success: true });
  }

  const resetToken = Math.random().toString(36).substr(2);
  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

  try {
    const sent = await sendMail(email, resetLink);
    if (sent) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, error: 'Email could not be sent' });
    }
  } catch (err) {
    console.error('Error in forgot-password:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
