const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: '185.212.71.102',
  user: 'u603642692_ggarey',
  password: '1tH/d6*:cUBA',
  database: 'u603642692_subscriptions',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Define API routes for subscribing and managing emails
app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  // Insert the email into the MySQL database
  const sql = 'INSERT INTO emails (email) VALUES (?)';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(400).json({ message: 'Subscription failed' });
    } else {
      console.log('Email inserted into MySQL database');
      res.status(200).json({ message: 'Subscription successful' });
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
