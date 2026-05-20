const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb:27017/healthai_social';

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGO_DB_NAME || 'healthai_social',
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

module.exports = connectMongo;
