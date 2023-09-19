const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const db = mysql.createConnection({
  host: process.env.NEXT_PUBLIC_DBHOST,
  user: process.env.NEXT_PUBLIC_USERDBUSER,
  password: process.env.NEXT_PUBLIC_USERDBPASS,
  database: process.env.NEXT_PUBLIC_USERDBNAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Define your API routes

// Route to fetch user data by walletId
router.get('/api/displayUserdata', (req, res) => {
  const query = 'SELECT username, bio FROM users WHERE walletId = ?';
  const userId = req.query.walletId;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = results[0];
    res.json(userData);
  });
});

// Export the router to be used in your main server file
module.exports = router;
