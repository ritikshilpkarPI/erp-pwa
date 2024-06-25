require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const handleErrors = require('./middleware/handleError');

const app = express();

const MONGODB_URI = process.env.MONGODB_URI || 'your_default_mongodb_uri';
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const PORT = process.env.PORT || 2000;

app.use(express.json({ limit: '500mb' }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB');
  }
}

connectDB();

app.use(handleErrors);

const server = app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

module.exports.handler = serverless(app);
