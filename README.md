

---

```markdown
# URL Shortener Microservice with Logging

This is a backend-only URL shortener microservice built in Node.js (JavaScript) with an external logging middleware.

## Project Structure

```

project-root/
├── backend/
│   ├── index.js
│   ├── controllers/
│   ├── services/
│   └── utils/
├── loging/
│   └── logger.js

````

## Features

- Shortens long URLs (with optional custom shortcode)
- Supports URL expiry (default: 30 minutes)
- Redirects to original URLs
- Tracks usage statistics (clicks, timestamps, referrer, IP)
- Sends logs to external logging service

## Tech Stack

- Node.js
- Express.js
- Axios (for logging)
- In-memory store using JavaScript Map

## API Endpoints

### POST /shorturls

Create a new short URL.

**Request Body:**
```json
{
  "url": "https://example.com",
  "validity": 15,
  "shortcode": "custom123"
}
````

**Response:**

```json
{
  "shortLink": "http://localhost:3000/custom123",
  "expiry": "2025-07-15T10:30:00.000Z"
}
```

### GET /\:shortcode

Redirects to the original long URL.

### GET /shorturls/\:shortcode

Returns statistics for the shortcode.

**Response:**

```json
{
  "originalUrl": "https://example.com",
  "createdAt": "2025-07-15T09:30:00.000Z",
  "expiry": "2025-07-15T10:00:00.000Z",
  "totalClicks": 2,
  "clicks": [
    {
      "timestamp": "2025-07-15T09:35:00.000Z",
      "referrer": "https://google.com",
      "location": "::1"
    }
  ]
}
```

## Logging

Located in `loging/logger.js`.

**Usage:**

```js
Log("backend", "info", "controller", "Short URL created");
```

Logs are sent to:

```
POST http://20.244.56.144/evaluation-service/logs
```

With required header:

```
Authorization: Bearer <access_token>
```

## Setup & Run

```bash
npm install
node backend/index.js
```

## Notes

* No database used – temporary in-memory store
* Logging middleware lives in a separate folder (`loging`)
* Logs are sent using the provided access token


