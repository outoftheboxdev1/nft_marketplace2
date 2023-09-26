const express = require('express');
const mysql = require('mysql');

const router = express.Router();

// Function to create a MySQL connection
function createDbConnection() {
  return mysql.createConnection({
    host: process.env.NEXT_PUBLIC_DBHOST,
    user: process.env.NEXT_PUBLIC_USERDBUSER,
    password: process.env.NEXT_PUBLIC_USERDBPASS,
    database: process.env.NEXT_PUBLIC_USERDBNAME,
  });
}

// Define your API routes

// Route to fetch user data by walletId
router.get('/api/displayUserdata', (req, res) => {
  const query = 'SELECT username, bio, verified FROM users WHERE walletId = ?';
  const userId = req.query.walletId;

  // Function to execute the query and handle retries
  function executeQueryWithRetry(connection, attempt) {
    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error(`Error on attempt ${attempt}: ${err.message}`);

        // Retry logic: You can adjust the number of retries and delay as needed
        if (attempt < 3) {
          setTimeout(() => {
            executeQueryWithRetry(connection, attempt + 1);
          }, 1000); // 1-second delay between retries
        } else {
          return res.status(500).json({ error: 'Error fetching user data' });
        }
      } else {
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }

        const userData = results[0];
        res.json(userData);
      }
    });
  }
  // Create a new database connection for each attempt
  const dbConnection = createDbConnection();

  // Start the initial query attempt
  executeQueryWithRetry(dbConnection, 1);
  dbConnection.end();
});

// Export the router to be used in your main server file
module.exports = router;
