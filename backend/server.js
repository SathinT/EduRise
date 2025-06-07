import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import fundingRoutes from "./routes/fundingRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoutes from './routes/AdminRoutes.js';
import donorRoutes from './routes/donorRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import paymentRoutes from './routes/PaymentRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // parse JSON request bodies

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174','http://localhost:5175'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400 // 24 hours
}));

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Special handling for Stripe webhook endpoint
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/funding", fundingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/donor', donorRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/ai', aiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// DB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("✅ MongoDB connected");
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));
