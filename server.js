const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let completions = [];

app.get('/completions', (req, res) => {
  res.json({ completions });
});

app.post('/complete', (req, res) => {
  const { walletAddress, courseId, studentName } = req.body;

  if (!walletAddress || !courseId || !studentName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const completion = {
    walletAddress,
    courseId,
    studentName,
    timestamp: new Date().toISOString(),
  };

  completions.push(completion);
  res.json({ message: 'Completion recorded', completion });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
