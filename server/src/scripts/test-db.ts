import { connectDB, disconnectDB } from '../config/db.js';

async function testDatabaseConnection() {
  const connected = await connectDB();

  if (!connected) {
    process.exitCode = 1;
    return;
  }

  console.log('MongoDB connection test passed.');
  await disconnectDB();
}

testDatabaseConnection().catch(() => {
  console.error('MongoDB connection test failed.');
  process.exitCode = 1;
});
