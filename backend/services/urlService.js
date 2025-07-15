// services/urlService.js

const urlDB = new Map(); // key: shortcode → value: { originalUrl, expiry, createdAt, clicks: [] }

function createShortUrl(originalUrl, validity = 30, shortcode) {
  const code = shortcode || generateShortcode();
  const expiry = new Date(Date.now() + validity * 60000);
  const createdAt = new Date();

  if (urlDB.has(code)) {
    throw new Error("Shortcode already in use");
  }

  urlDB.set(code, {
    originalUrl,
    expiry,
    createdAt,
    clicks: [] // ← track clicks here
  });

  return { shortLink: `http://localhost:3000/${code}`, expiry };
}

function getOriginalUrl(code, clickInfo) {
  const entry = urlDB.get(code);
  if (!entry) throw new Error("Shortcode not found");
  if (new Date() > entry.expiry) {
    urlDB.delete(code);
    throw new Error("Shortcode expired");
  }

 
  entry.clicks.push(clickInfo);

  return entry.originalUrl;
}

function getShortUrlStats(code) {
  const entry = urlDB.get(code);
  if (!entry) throw new Error("Shortcode not found");

  return {
    originalUrl: entry.originalUrl,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    totalClicks: entry.clicks.length,
    clicks: entry.clicks
  };
}

module.exports = { createShortUrl, getOriginalUrl, getShortUrlStats };
