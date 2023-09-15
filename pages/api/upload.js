import * as formidable from 'formidable';
import fs from 'fs/promises'; // Use fs.promises for async file operations
import path from 'path';

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
      const customFileName = fields.user;
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
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
