import express from 'express';
import cors from 'cors';
import fundingRoutes from './routes/funding.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Apply file upload middleware to routes that need it
app.use('/api/funding', (req, res, next) => {
    if (req.method === 'POST' && req.path.includes('/thank-note')) {
        upload.single('media')(req, res, next);
    } else {
        next();
    }
});

app.use('/api/funding', fundingRoutes);

// Optionally: add other routes here
// import userRoutes from './routes/userRoutes.js';
// app.use('/api/users', userRoutes);

export default app;