const { google } = require('googleapis');
const fs = require('fs');

const credentials = JSON.parse(fs.readFileSync('oauth-credentials.json'));
const oAuth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Paste your AUTH_CODE below
const authCode = '4/0Ab32j9023ga8kj0VOBH7Lv5tEbMOUvn0XX9lJxC-anB4lK1S2j74nIcCrK_o2-IwbRZxZg&scope=https://mail.google.com/';

oAuth2Client.getToken(authCode, (err, token) => {
  if (err) return console.error('Error retrieving access token', err);
  console.log('Your Refresh Token:', token.refresh_token);
});
