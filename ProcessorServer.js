const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = '010203';

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Users list, open list array
const users = [
    { id: 1, username: 'user204', password: 'usr204Pass@@' } 
  ];

// Use cors middleware to enable CORS
app.use(cors());

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));


// login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;  
    // Find user by username
    const user = users.find(user => user.username === username);  
    // If user not found or password is incorrect, return error
    if (username != user.username || password != user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  
    // Send token to client
    res.json({ token });
  });
  
  // Middleware to verify JWT token
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
      }
      req.user = decoded;
      next();
    });
  };
  
app.get('/api', verifyToken, async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const searchMediam = req.query.media;//
        const response = await axios.get(`https://itunes.apple.com/search?term=${searchTerm}&media=${searchMediam}`);
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: 'An error occurred while fetching songs' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
