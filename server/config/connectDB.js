import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) {
            console.warn("\x1b[33m%s\x1b[0m", "[WARN] MONGODB_URI is not set in .env! Database connection skipped. Please add it to server/.env.");
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("\x1b[32m%s\x1b[0m", "✓ MongoDB connected successfully");
    } catch (error) {
        console.error("Mongodb connection error:", error.message);
    }
}

export default connectDB;
