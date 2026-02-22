import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import NewInvoice from './pages/NewInvoice';
import FeaturesInvoices from './pages/FeaturesInvoices';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Customers from './pages/Customers';
import Quotes from './pages/Quotes';
import NewQuote from './pages/NewQuote';
import Reports from './pages/Reports';
import Items from './pages/Items';
import PaymentsReceived from './pages/PaymentsReceived';
import Settings from './pages/Settings';
import RecurringInvoices from './pages/RecurringInvoices';
import CreditNotes from './pages/CreditNotes';
import Templates from './pages/Templates';
import QuoteDetails from './pages/QuoteDetails';
import RecordPayment from './pages/RecordPayment';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features/invoices" element={<FeaturesInvoices />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard Routes wrapped in ProtectedRoute and the Sidebar/Header Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/new" element={<NewInvoice />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/quotes/new" element={<NewQuote />} />
            <Route path="/quotes/:id" element={<QuoteDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/items" element={<Items />} />
            <Route path="/payments" element={<PaymentsReceived />} />
            <Route path="/payments/new" element={<RecordPayment />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/recurring" element={<RecurringInvoices />} />
            <Route path="/credit-notes" element={<CreditNotes />} />
            <Route path="/templates" element={<Templates />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
