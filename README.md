Here’s a **simple and clear `README.md`** for your URL Shortener microservice with logging:

---

```markdown
# 🔗 URL Shortener Microservice with Logging

This is a backend-only URL shortener microservice built in **Node.js (JavaScript)** with an external **logging middleware**.

---

## 📁 Project Structure

```

project-root/
├── backend/
│   ├── index.js
│   ├── controllers/
│   ├── services/
│   └── utils/
├── loging/
│   └── logger.js  ← Reusable logging utility (outside backend)

````

---

## 🚀 Features

- 🔗 Shorten long URLs (with optional custom shortcode)
- 🕓 Set expiry time (default: 30 minutes)
- 🔁 Redirect to original URL via `/shortcode`
- 📊 View usage stats: total clicks, referrer, timestamp, IP
- 📝 All activity is logged via external `Log()` middleware

---

## 📦 Tech Stack

- Node.js
- Express.js
- Axios (for logging)
- In-memory store using JavaScript `Map()`

---

## 📌 API Endpoints

### 1. **POST /shorturls**

Create a new short URL.

**Request Body:**
```json
{
  "url": "https://example.com",
  "validity": 15,             // optional (minutes)
  "shortcode": "custom123"    // optional
}
````

**Response:**

```json
{
  "shortLink": "http://localhost:3000/custom123",
  "expiry": "2025-07-15T10:30:00.000Z"
}
```

---

### 2. **GET /\:shortcode**

Redirects to the original long URL if valid.

---

### 3. **GET /shorturls/\:shortcode**

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

---

## 🛠 Logging Setup

Located in `loging/logger.js`.

**Usage:**

```js
Log("backend", "info", "controller", "Short URL created");
```

**Sends logs to:**

```
POST http://20.244.56.144/evaluation-service/logs
```

With headers:

```http
Authorization: Bearer <access_token>
```

---

## 📦 Install & Run

```bash
npm install
node backend/index.js
```

---

## points

* No database used – in-memory only (for evaluation).
* Logging utility is reusable and lives outside the backend.
* All logs are authenticated using access token.



