const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse cookies
app.use(cookieParser());

// CORS middleware to allow requests from your frontend origin
const corsOptions = {
    origin: 'http://localhost:3001', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  };

  // Use CORS middleware
app.use(cors(corsOptions));

// Secret key for JWT
const JWT_SECRET = '70ebba88a0e98cfba9f9d3933b648f342bfc73f029d2d4f92aca95a9c683e064a0189d98419717edb20568f06c261c0ace107f94111d8007138f44b0e370ff494701a4b28dbacdaf22b8e4f8cdcd3bc25c630da1c502abb406ee17f0a785ca7034a2241c3adfda9f33f70d369393d353c28e47ff5551320748cecff10f5d66cef46824a480160e0aa946319d51d3305a2b2c38fc91990105d2ea8d9cd6ee9e409a52749c997217bf36bd551f72e274c3650f20397b898d6857e2ad6bebb7fb9c272e6b9818fea8841d40390929cff7a01ff84e7e0e6e158535d56f03b44ba0dfd0d1612bf5eb3a0bf9d5bc7ea488799cde6e2f346b3ecf80c844b6d6f09793bf';

// Simple login route
app.post('/login', (req, res) => {
  // In a real app, you'd authenticate the user here
  const user = { id: 1, username: 'testuser' };

  // Generate a JWT token
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

  // Set the JWT token as a cookie
  res.cookie('token', token, {
    httpOnly: true,  // Not accessible via JavaScript
    secure: false,   // Set to true in production
    sameSite: 'None', // Adjust as needed for cross-site requests
  });

  res.json({ message: 'Login successful, JWT set as cookie.' });
});

// Protected route to verify the cookie
app.get('/protected', (req, res) => {
  const token = req.cookies.token;
//   console.log("token",token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }

    res.json({ message: 'Protected route accessed!', user: decoded });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
