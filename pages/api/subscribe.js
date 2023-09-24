/* eslint-disable no-unused-vars */
const express = require('express');
const mysql = require('mysql');

const router = express.Router(); // Use an Express Router for your routes

// Create a MySQL database connection
const db = mysql.createConnection({
  host: process.env.NEXT_PUBLIC_DBHOST,
  user: process.env.NEXT_PUBLIC_SUBDBUSER,
  password: process.env.NEXT_PUBLIC_SUBDBPASS,
  database: process.env.NEXT_PUBLIC_SUBDBNAME,
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
router.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  // Insert the email into the MySQL database
  const sql = 'INSERT INTO emails (email) VALUES (?)';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      console.log('Email inserted into MySQL database');
      res.status(200).json({ message: 'Subscription successful' });
    }
  });
});

// Error handling middleware (should be placed after your routes)
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
