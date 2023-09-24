/* eslint-disable no-unused-vars */
// Use an Express Router for your routes
import * as formidable from 'formidable';
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
  form.uploadDir = path.join(process.cwd(), 'public/profiles'); // Set the upload directory

  try {
    form.parse(req, async (err, fields, files) => {
      const nftPath = fields.path;
      const { price } = fields;
      const walletid = fields.user;
      const { name } = fields;
      const { description } = fields;
      const { category } = fields;

      // Check if the MySQL connection is established
      if (db.state !== 'authenticated') {
        console.error('MySQL connection is not authenticated');
        // return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Check if walletid already exists in the database
      const checkSql = 'SELECT * FROM nfts WHERE path = ?';
      db.query(checkSql, [nftPath], (checkErr, checkResults) => {
        if (checkErr) {
          console.error('MySQL query error:', checkErr);
          return res.status(500).json({ message: 'Internal Server Error' });
        } if (checkResults.length > 0) {
          // A record with the same walletid already exists
          console.log('Wallet ID already exists in the database, updating the record');

        //   // Update the existing record
        //   const updateSql = 'UPDATE users SET path = ?, price = ? WHERE walletid = ?';
        //   db.query(updateSql, [nftPath, price, walletid], (updateErr, updateResult) => {
        //     if (updateErr) {
        //       console.error('MySQL query error:', updateErr);
        //       return res.status(500).json({ message: 'Internal Server Error' });
        //     }
        //     console.log('Data updated in MySQL database');
        //     // return res.status(200).json({ message: 'Data updated successfully' });
        //   });
        } else {
          // Insert the email into the MySQL database
          const nftUrl = `https://ever-traded.infura-ipfs.io/ipfs/${nftPath}`;
          const insertSql = 'INSERT INTO nfts (path, price, url, seller, name, description, category) VALUES (?, ?, ?, ?, ?, ?, ?)';
          if (name) {
            db.query(insertSql, [nftPath, price, nftUrl, walletid, name, description, category], (insertErr, result) => {
              if (insertErr) {
                console.error('MySQL query error:', insertErr);
                return res.status(500).json({ message: 'Internal Server Error' });
              }
              console.log('Data inserted into MySQL database');
              return res.status(200).json({ message: 'Data inserted successfully' });
            });
          }
          console.log(nftPath);
          const nftPath1 = nftPath.toString().replace('https://ever-traded.infura-ipfs.io/ipfs/', '');

          const insertSql1 = 'INSERT INTO nftprices (path, price, seller) VALUES (?, ?, ?)';
          db.query(insertSql1, [nftPath1, price, walletid], (insertErr1, result) => {
            if (insertErr1) {
              console.error('MySQL query error:', insertErr1);
              return res.status(500).json({ message: 'Internal Server Error' });
            }
            console.log('Data inserted into MySQL database');
            return res.status(200).json({ message: 'Data inserted successfully' });
          });
        }
      });
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'An error occurred while parsing the form' });
      }
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
