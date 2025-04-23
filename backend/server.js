// server.js

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Simple Test Route
app.get("/api/test", (req, res) => {
    res.json({ message: "🎉 API is working, bro!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
