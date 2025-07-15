// controllers/urlController.js
const Log = require('../../log/logger.js');
const { createShortUrl, getOriginalUrl,getShortUrlStats} = require('../services/urlService');

async function handleCreateShortUrl(req, res) {
  try {
    const { url, validity = 30, shortcode } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const result = createShortUrl(url, validity, shortcode);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}





async function handleRedirect(req, res) {
  try {
    const code = req.params.shortcode;

    const clickInfo = {
      timestamp: new Date(),
      referrer: req.get('referer') || 'unknown',
      location: req.ip // you can use geo-IP services for actual country if needed
    };

    const longUrl = getOriginalUrl(code, clickInfo);

    Log("backend", "info", "controller", `Redirecting to: ${longUrl}`);
    res.redirect(longUrl);
  } catch (err) {
    Log("backend", "error", "controller", err.message);
    res.status(404).json({ error: err.message });
  }
}


// controllers/urlController.js
async function handleGetStats(req, res) {
  try {
    const code = req.params.shortcode;
    const stats = getShortUrlStats(code);

    Log("backend", "info", "controller", `Stats retrieved for ${code}`);
    res.json(stats);
  } catch (err) {
    Log("backend", "error", "controller", err.message);
    res.status(404).json({ error: err.message });
  }
}

module.exports = { handleCreateShortUrl, handleRedirect, handleGetStats };
