# Zoho Invoice Clone

Full-stack invoicing application with Stripe payment integration.

## Tech Stack

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Database: MongoDB
- Payment: Stripe
- Auth: Firebase

## Local Development

### Prerequisites

- Node.js 16+
- MongoDB (optional - uses in-memory DB if not available)

### Setup

1. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

2. Configure environment variables:

Backend `.env`:
```
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
FRONTEND_URL=http://localhost:5173
MONGODB_URI=
PORT=5001
NODE_ENV=development
```

Frontend `.env`:
```
VITE_FIREBASE_KEY=your_firebase_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=http://localhost:5001/api
```

3. Start servers:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

4. Open http://localhost:5173

## Deployment

### Backend (Render) - DEPLOYED

Backend URL: `https://zoho-assignment-1.onrender.com`

To update CORS for your frontend:
1. Go to Render dashboard: https://dashboard.render.com
2. Select your service: `zoho-clone-backend`
3. Go to "Environment" tab
4. Add/Update: `FRONTEND_URL=https://zoho-assignment-sepia.vercel.app`
5. Save (triggers automatic redeploy)

### Frontend (Vercel) - DEPLOYED

Frontend URL: `https://zoho-assignment-sepia.vercel.app`

Environment variables configured:
- `VITE_FIREBASE_KEY=AIzaSyBYKSge-ajWyXSVdlC-kZd3VjdSKWq5gKE`
- `VITE_STRIPE_PUBLIC_KEY=pk_test_51T3sQuI79Yh7o1QxUibIvtK8NGiIZZU1aCEO4j7mNcTbS0GxiNGAscJ1MIU0xCTuYsUSuT5r6GYgtAIqufx5I7Bb00AnRk5q5Y`
- `VITE_API_URL=https://zoho-assignment-1.onrender.com/api`

### Post-Deployment Setup

#### 1. Update Backend CORS (Render)
Add environment variable: `FRONTEND_URL=https://zoho-assignment-sepia.vercel.app`

#### 2. Add Vercel Domain to Firebase
1. Go to Firebase Console: https://console.firebase.google.com
2. Select project: "hehe-aefef"
3. Authentication > Settings > Authorized domains
4. Add domain: `zoho-assignment-sepia.vercel.app`
5. Save

After these steps, signin/signup will work on production.

## Features

- Invoice management (create, view, edit, delete)
- Customer management
- Quote generation
- Stripe payment integration
- PDF export
- Dashboard with analytics
- Recurring invoices
- Credit notes
- Payment tracking

## Testing Payments

Use Stripe test card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

## Project Structure

```
.
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── config/      # Configuration
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create invoice
- `POST /api/payments/create-payment-intent` - Create Stripe payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/customers` - Get customers
- `GET /api/reports/summary` - Get dashboard summary

## License

MIT
