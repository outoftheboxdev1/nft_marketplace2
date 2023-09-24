/* eslint-disable no-unused-vars */
// Use an Express Router for your routes
import * as formidable from 'formidable';
import fs from 'fs/promises'; // Use fs.promises for async file operations
import path from 'path';

const mysql = require('mysql');

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
export const config = {
  api: {
    bodyParser: false, // Disable body parsing, so we can handle the form data
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = '/public/profiles'; // Set the upload directory

  try {
    form.parse(req, async (err, fields, files) => {
      const customFileName = fields.user;

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

      console.log('Received files:', files);

      // Check if a file was uploaded
      if (!files.file || !files.file[0]) {
        console.error('No file uploaded');
        // return res.status(400).json({ error: 'No file uploaded' });
      } else {
        // Get the first file from the array
        const uploadedFile = files.file[0];

        // Get the old path from the uploaded file
        const oldPath = uploadedFile.filepath;
        // Get the original filename
        const originalFileName = uploadedFile.originalFilename;

        // Extract the file extension
        const fileExtension = path.extname(originalFileName);
        // Check if oldPath is defined and not empty
        if (!oldPath) {
          console.error('Old path is not defined');
          return res.status(500).json({ error: 'Old path is not defined' });
        }

        const newPath = path.join(form.uploadDir, `${customFileName}${fileExtension}`);

        console.log('Old Path:', oldPath);
        console.log('New Path:', newPath);

        // Create the target directory if it doesn't exist
        try {
          await fs.mkdir(form.uploadDir, { recursive: true });
        } catch (mkdirErr) {
          console.error('Error creating directory:', mkdirErr);
          return res.status(500).json({ error: 'An error occurred while creating the directory' });
        }
        // Move the file
        try {
          await fs.rename(oldPath, newPath);
          return res.status(200).json({ success: true, message: 'File uploaded successfully' });
        } catch (renameErr) {
          console.error('Error moving file:', renameErr);
          return res.status(500).json({ error: 'An error occurred while moving the file' });
        }
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
