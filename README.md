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

### Backend (Render)

1. Create MongoDB Atlas cluster and get connection string
2. Create new Web Service on Render
3. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=10000`
   - `MONGODB_URI=your_mongodb_atlas_uri`
   - `STRIPE_SECRET_KEY=your_key`
   - `STRIPE_PUBLISHABLE_KEY=your_key`
   - `FRONTEND_URL=your_vercel_url`

### Frontend (Vercel)

1. Import repository to Vercel
2. Configure:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables:
   - `VITE_FIREBASE_KEY=your_key`
   - `VITE_STRIPE_PUBLIC_KEY=your_key`
   - `VITE_API_URL=your_render_backend_url/api`

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
