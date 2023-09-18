const express = require('express');
const mysql = require('mysql'); // You'll need the MySQL library for Node.js

const app = express();

// Configure MySQL connection
const db = mysql.createConnection({
  host: '185.212.71.102',
  user: 'u603642692_users',
  password: '1w=TXr>R@[P',
  database: 'u603642692_user_profiles',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Create a route to fetch user data
app.get('/api/displayUserdata', (req, res) => {
  const query = 'SELECT username, bio FROM users WHERE walletId = ?'; // Adjust the query as needed

  // You'll need to extract the walletId from the request, e.g., req.query.walletId or req.params.walletId
  const userId = req.query.walletId;

  // Execute the query
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

// Start the server
const port = process.env.PORT || 3007;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;
