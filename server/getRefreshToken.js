const { google } = require('googleapis');
const fs = require('fs');

// Read your JSON credentials
const credentials = JSON.parse(fs.readFileSync('oauth-credentials.json'));


const oAuth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Generate a consent page URL
const SCOPES = ['https://mail.google.com/'];

const url = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});
console.log('Authorize this app by visiting this url:', url);
