// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { handleCreateShortUrl, handleRedirect, handleGetStats } = require('./controllers/urlController');

const app = express();
app.use(bodyParser.json());

app.post('/shorturls', handleCreateShortUrl);
app.get('/shorturls/:shortcode', handleGetStats); 
app.get('/:shortcode', handleRedirect);

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
