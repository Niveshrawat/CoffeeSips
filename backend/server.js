const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Status page
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CoffeeSips API</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a0a00 0%, #3b1a08 50%, #1a0a00 100%);
      font-family: 'Inter', sans-serif;
      color: #fff;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 48px 56px;
      text-align: center;
      max-width: 480px;
      width: 90%;
      box-shadow: 0 24px 64px rgba(0,0,0,0.4);
    }
    .logo { font-size: 3rem; margin-bottom: 12px; }
    h1 { font-size: 1.8rem; font-weight: 700; color: #f5c87a; letter-spacing: -0.5px; }
    p { margin-top: 8px; font-size: 0.95rem; color: rgba(255,255,255,0.55); }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 28px;
      background: rgba(34,197,94,0.12);
      border: 1px solid rgba(34,197,94,0.3);
      border-radius: 100px;
      padding: 8px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      color: #4ade80;
    }
    .dot {
      width: 8px; height: 8px;
      background: #4ade80;
      border-radius: 50%;
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.3); }
    }
    .divider {
      border: none;
      border-top: 1px solid rgba(255,255,255,0.08);
      margin: 28px 0;
    }
    .endpoints { text-align: left; }
    .endpoints h3 { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.35); margin-bottom: 12px; }
    .endpoint {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      font-size: 0.88rem;
    }
    .method {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
      background: rgba(245,200,122,0.15);
      color: #f5c87a;
    }
    .path { color: rgba(255,255,255,0.7); font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">☕</div>
    <h1>CoffeeSips API</h1>
    <p>Backend service is live and running</p>
    <div class="status"><span class="dot"></span> All systems operational</div>
    <hr class="divider"/>
    <div class="endpoints">
      <h3>Available Endpoints</h3>
      <div class="endpoint"><span class="method">GET</span><span class="path">/api/blogs</span></div>
      <div class="endpoint"><span class="method">GET</span><span class="path">/api/blogs/:slug</span></div>
      <div class="endpoint"><span class="method">POST</span><span class="path">/api/blogs</span></div>
      <div class="endpoint"><span class="method">POST</span><span class="path">/api/auth/login</span></div>
      <div class="endpoint"><span class="method">POST</span><span class="path">/api/blogs/upload</span></div>
    </div>
  </div>
</body>
</html>`);
});

// Routes
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
