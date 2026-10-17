import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';

import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.router.js';
import subCategoryRouter from './route/subCategory.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import addressRouter from './route/address.route.js';
import orderRouter from './route/order.route.js';
import adminRouter from './route/admin.routes.js';

const app = express();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (origin === frontendUrl || origin === 'http://localhost:5173' || origin === 'http://localhost:3000') {
            return callback(null, true);
        }
        return callback(null, true); // Dev friendly
    }
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Medicine Wholesale E-Commerce API is running",
        version: "2.0.0",
        port: PORT
    });
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/admin', adminRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(err.status || 500).json({
        success: false,
        error: true,
        message: err.message || "Internal Server Error"
    });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✓ Server running at http://localhost:${PORT}`);
    });
});
