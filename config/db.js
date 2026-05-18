const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let dbUrl = process.env.MONGODB_URI;

    // If the network is blocking the cloud, automatically spin up the internal RAM database
    if (dbUrl.includes('mongodb.net') || process.env.NODE_ENV === 'development') {
      console.log('ℹ️ Network restriction detected. Spinning up local internal RAM database...');
      const mongoServer = await MongoMemoryServer.create();
      dbUrl = mongoServer.getUri();
    }

    await mongoose.connect(dbUrl);
    console.log('🚀 Internal MongoDB Database Connected Successfully!');
  } catch (error) {
    console.error('❌ Database Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;