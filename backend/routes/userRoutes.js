import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";



const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
    try {
        console.log("👉 Received request body:", req.body);

        const { fullName, email, phone, password, role } = req.body;

        // check for required fields
        if (!fullName || !email || !password) {
            return res
                .status(400)
                .json({ message: "Please fill all required fields" });
        }

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists with this email" });
        }

        // 👇 No need to hash password here, model does it automatically
        const newUser = new User({
            fullName,
            email,
            phone,
            password,
            role,
        });

        await newUser.save();

        res
            .status(201)
            .json({ message: "User registered successfully", userId: newUser._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong, bro!" });
    }
});


// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if fields are filled
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Success
        res.status(200).json({
            message: "Login successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed" });
    }
});

router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user,
    });
});


export default router;
