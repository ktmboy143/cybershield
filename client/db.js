const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
    try {
        await client.connect();
        console.log("MongoDB connected successfully!");
        return client.db("cybershield");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

module.exports = connectDB;