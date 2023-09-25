/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// Use an Express Router for your routes
import * as formidable from 'formidable';
import fs from 'fs'; // Use fs.promises for async file operations
import path from 'path';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

const mysql = require('mysql');

export const config = {
  api: {
    bodyParser: false,
  },
};

// Create a MySQL database connection
const db = mysql.createConnection({
  host: process.env.NEXT_PUBLIC_DBHOST,
  user: process.env.NEXT_PUBLIC_USERDBUSER,
  password: process.env.NEXT_PUBLIC_USERDBPASS,
  database: process.env.NEXT_PUBLIC_USERDBNAME,
});

// Connect to the database with error handling
try {
  db.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
      // Handle the connection error here, you might want to retry connecting
    } else {
      console.log('Connected to MySQL database');
    }
  });
} catch (error) {
  console.error('Error connecting to MySQL:', error);
  // Handle the connection error here
}
console.log('MySQL Connection State:', db.state);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = new formidable.IncomingForm();
  // form.uploadDir = path.join(process.cwd(), 'public/profiles');

  try {
    form.parse(req, async (err, fields, files) => {
      // const customFileName = fields.user;

      const { name } = fields;
      const { bio } = fields;
      const walletid = fields.user;

      // Check if the MySQL connection is established
      if (db.state !== 'authenticated') {
        console.error('MySQL connection is not authenticated');
        // return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Check if walletid already exists in the database
      const checkSql = 'SELECT * FROM users WHERE walletid = ?';
      db.query(checkSql, [walletid], (checkErr, checkResults) => {
        if (checkErr) {
          console.error('MySQL query error:', checkErr);
          return res.status(500).json({ message: 'Internal Server Error' });
        } if (checkResults.length > 0) {
          // A record with the same walletid already exists
          console.log('Wallet ID already exists in the database, updating the record');

          // Update the existing record
          const updateSql = 'UPDATE users SET username = ?, bio = ? WHERE walletid = ?';
          db.query(updateSql, [name, bio, walletid], (updateErr, updateResult) => {
            if (updateErr) {
              console.error('MySQL query error:', updateErr);
              return res.status(500).json({ message: 'Internal Server Error' });
            }
            console.log('Data updated in MySQL database');
            // return res.status(200).json({ message: 'Data updated successfully' });
          });
        } else {
          // Insert the email into the MySQL database
          const insertSql = 'INSERT INTO users (username, bio, walletid) VALUES (?, ?, ?)';
          db.query(insertSql, [name, bio, walletid], (insertErr, result) => {
            if (insertErr) {
              console.error('MySQL query error:', insertErr);
              return res.status(500).json({ message: 'Internal Server Error' });
            }
            console.log('Data inserted into MySQL database');
            // return res.status(200).json({ message: 'Data inserted successfully' });
          });
        }
      });

      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'An error occurred while parsing the form' });
      }

      // Check if a file was uploaded
      // if (!files.file || !files.file[0]) {
      //   console.error('No file uploaded');
      //   return res.status(400).json({ error: 'No file uploaded' });
      // // eslint-disable-next-line no-else-return
      // } else {
      //   const { searchParams } = new URL(req.url);
      //   const filename = searchParams.get('filename');

      //   const blob = await put(filename, req.body, {
      //     access: 'public',
      //   });

      //   return NextResponse.json(blob);
      // }
    });
  } catch (error) {
    console.error('Error uploading data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
