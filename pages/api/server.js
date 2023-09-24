/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

// ...

const subscribeRouter = require('./subscribe'); // Import your subscribe router

app.use('/api', subscribeRouter); // Mount the router under the /api path

// Error handling middleware (should be placed after your routes)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
