# 💊 MedWholesale V2 — Next-Gen B2B Medicine & Wholesale Healthcare Platform

A modernized, high-performance wholesale medicine and pharmaceutical distribution platform built on the MERN stack with modern aesthetics, optimized bundles, and zero redundant bloat.

---

## ⚡ What's New in V2 (Compared to Old Project)

1. **Lightweight & Blazing Fast**:
   - Eliminated over 10 redundant/unused libraries (`react-toastify`, `sweetalert2`, `moment`, `@tanstack/react-table`, `swiper`, `react-multi-carousel`, `react-type-animation`, `react-zoom-pan-pinch`, `react-inner-image-zoom`, `react-medium-image-zoom`).
   - Clean, unified notification system powered purely by `react-hot-toast`.
   - Native date formatting helper (`utils/formatDate.js`) eliminating the heavy 300KB moment bundle.
   - 10x faster Vite startup and build times.

2. **Critical Bug Fixes**:
   - **Fixed Authentication Token Refresh**: In `Axios.js`, resolved an issue where the request interceptor was mistakenly configured as a response interceptor, unblocking automatic token refresh.
   - **Fixed Global Session Reset**: Resolved an issue in `GlobalProvider.jsx` that erroneously cleared `localStorage` on every render upon login.
   - **Fixed Server Crash on Missing Env**: Replaced top-level uncaught exceptions in `connectDB.js` with graceful warnings.
   - **Fixed Port Configuration Bug**: Corrected `PORT = process.env.PORT || 8080`.
   - **Fixed Route Duplication**: Cleaned duplicate routes in `route/index.jsx` and fixed typos (`BannerUploadPage`).

3. **Modern Medical Healthcare Aesthetic**:
   - Fresh Emerald & Teal palette tailored for healthcare e-commerce.
   - Sleek product cards showing B2B wholesale prices, MRP discounts, unit/pack sizes, and real-time inventory indicators.
   - Modernized glassmorphic header with quick search, category pills, and shopping cart drawer.
   - Professional compliance-ready pharmaceutical footer with Drug Act disclaimers.

---

## 🛠️ Project Structure

```
medicine-wholesale-v2/
├── client/                 # Modern React 18 + Vite frontend
│   ├── src/
│   │   ├── assets/        # Media and brand logos
│   │   ├── common/        # API configurations (SummaryApi)
│   │   ├── components/    # Modernized UI components
│   │   ├── layouts/       # Dashboard & Admin layouts
│   │   ├── pages/         # Customer and Admin pages
│   │   ├── provider/      # Global state provider
│   │   ├── store/         # Redux Toolkit slices
│   │   └── utils/         # Lightweight utilities (Axios, formatDate)
│   ├── .env.example       # Frontend environment variables template
│   └── package.json       # Clean, minimal dependencies
│
├── server/                 # Express.js + MongoDB backend
│   ├── config/            # DB, Stripe, Cloudinary, and Email configs
│   ├── controllers/       # Modular controllers for auth, orders, products
│   ├── middleware/        # JWT auth, Admin role guards, multer
│   ├── models/            # Mongoose schemas
│   ├── route/             # Express API routes
│   ├── utils/             # Tokens, OTP, and image upload utilities
│   ├── .env.example       # Backend environment variables template
│   └── index.js           # Server entry point
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Setup Backend (`server`)

```bash
cd server
cp .env.example .env
# Edit .env and enter your MONGODB_URI and secret keys
npm run dev
```

Server runs on: **`http://localhost:8080`**

### 2. Setup Frontend (`client`)

```bash
cd client
cp .env.example .env
npm run dev
```

Client runs on: **`http://localhost:5173`**

---

## 👥 Key Features

- **B2B Retailer Verification**: Admin approval workflow for retail drug licenses before placing orders.
- **Wholesale Tier Pricing**: Wholesale rates, MRP discounts, and pack sizing.
- **Inventory & Stock Manager**: Real-time stock counts and low-stock alerts.
- **Order Tracking & Analytics**: Date-wise wholesale dispatch status and revenue reports.
- **Payment Options**: Cash on Delivery and Stripe online checkout.
