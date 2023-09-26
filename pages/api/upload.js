/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// Use an Express Router for your routes
import * as formidable from 'formidable';
import fs from 'fs'; // Use fs.promises for async file operations
import path from 'path';
import * as AWS from 'aws-sdk';
import mysql from 'mysql';

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET_NAME } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const s3 = new AWS.S3();

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

  try {
    form.parse(req, async (err, fields, files) => {
      const customFileName = fields.user;
      const { name } = fields;
      const { bio } = fields;
      const walletid = fields.user;

      if (!name) {
        console.log('no data changed');
      } else {
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
            });
          }
        });
      }

      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'An error occurred while parsing the form' });
      }

      console.log('Received files:', files);

      // Check if a file was uploaded
      if (!files.file || !files.file[0]) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const uploadedFile = files.file[0];
      const originalFilename = uploadedFile.name;
      const fileExtension = path.extname(originalFilename);
      const fileName = `${customFileName}${fileExtension}`; // Set the S3 object key (filename)

      // Read the file from the local path
      const fileContent = fs.readFileSync(uploadedFile.filepath);

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileContent,
      };

      // Upload the file to S3
      s3.upload(params, (s3Err, data) => {
        if (s3Err) {
          console.error('Error uploading file to S3:', s3Err);
          return res.status(500).json({ error: 'An error occurred while uploading to S3' });
        }
        console.log('File uploaded to S3 successfully');
        // You can now update your database or send a response as needed.

        // If you want to move the file to a different folder in S3, you can use the CopyObject API
        // For example, to move the file to a "new-folder" in the same bucket:
        const newKey = `${customFileName}${fileExtension}`;
        const copyParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          CopySource: `${process.env.AWS_BUCKET_NAME}/${fileName}`, // Use the full S3 path
          Key: newKey,
        };
        s3.copyObject(copyParams, (copyErr, copyData) => {
          if (copyErr) {
            console.error('Error moving file in S3:', copyErr);
            return res.status(500).json({ error: 'An error occurred while moving the file in S3' });
          }
          console.log('File moved to a new folder in S3 successfully');
          // You can now delete the original file in S3 if needed:
          s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: fileName }, (deleteErr, deleteData) => {
            if (deleteErr) {
              console.error('Error deleting original file in S3:', deleteErr);
              return res.status(500).json({ error: 'An error occurred while deleting the original file in S3' });
            }
            console.log('Original file in S3 deleted successfully');
            // Now you can update your database or send a response as needed.
            return res.status(200).json({ success: true, message: 'File uploaded and moved successfully' });
          });
        });
      });
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
