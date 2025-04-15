// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS so that your frontend can communicate with the backend from different origins
app.use(cors());

// Parse JSON bodies for incoming requests
app.use(bodyParser.json());

// In-memory storage for course completions
let completions = [];

/**
 * GET /completions
 * Returns all recorded course completions.
 */
app.get('/completions', (req, res) => {
  res.json({ completions });
});

/**
 * POST /complete
 * Expects JSON with: { walletAddress, courseId, studentName }
 * Records a course completion.
 */
app.post('/complete', (req, res) => {
  const { walletAddress, courseId, studentName } = req.body;

  if (!walletAddress || !courseId || !studentName) {
    return res.status(400).json({ error: 'Missing required fields: walletAddress, courseId, studentName' });
  }

  const completion = {
    walletAddress,
    courseId,
    studentName,
    timestamp: new Date().toISOString()
  };

  completions.push(completion);
  res.json({ message: 'Course completion recorded', completion });
});

// Optionally serve static files from the "public" directory if you want to host your frontend here.
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});