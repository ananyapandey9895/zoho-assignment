import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Loader } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import StripePaymentForm from './StripePaymentForm';
import API from '../config/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripePaymentModal = ({ invoice, isOpen, onClose, onSuccess }) => {
    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && invoice) {
            initializePayment();
        }
    }, [isOpen, invoice]);

    const initializePayment = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Initializing payment for invoice:', invoice._id);

            const response = await axios.post(
                `${API}/payments/create-payment-intent`,
                { invoiceId: invoice._id }
            );

            console.log('Payment intent created:', response.data);
            setClientSecret(response.data.clientSecret);
        } catch (err) {
            console.error('Payment initialization error:', err);
            console.error('Response data:', err.response?.data);
            console.error('Response status:', err.response?.status);
            
            const errorMessage = err.response?.data?.message || 
                                err.message || 
                                'Failed to initialize payment. Please try again.';
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = async (paymentIntent) => {
        try {
            // Verify payment with backend
            await axios.post(`${API}/payments/verify`, {
                invoiceId: invoice._id,
                paymentIntentId: paymentIntent.id,
            });

            // Call success callback
            if (onSuccess) {
                onSuccess(invoice);
            }

            // Close modal
            onClose();
        } catch (err) {
            console.error('Payment verification error:', err);
            setError('Payment successful but verification failed. Please contact support.');
        }
    };

    const handlePaymentError = (errorMessage) => {
        setError(errorMessage);
    };

    if (!isOpen || !invoice) return null;

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#0088FF',
            },
        },
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                        Pay Invoice #{invoice.invoiceNumber}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <Loader className="h-8 w-8 text-[#0088FF] animate-spin mb-4" />
                            <p className="text-gray-600">Initializing payment...</p>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                            <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-red-900">Error</p>
                                <p className="text-sm text-red-700 mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    {!loading && !error && clientSecret && (
                        <Elements stripe={stripePromise} options={options}>
                            <StripePaymentForm
                                clientSecret={clientSecret}
                                amount={invoice.total}
                                invoiceNumber={invoice.invoiceNumber}
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                                onCancel={onClose}
                            />
                        </Elements>
                    )}

                    {!loading && error && (
                        <button
                            onClick={initializePayment}
                            className="w-full py-3 bg-[#0088FF] text-white font-semibold rounded-lg hover:bg-[#0070d2] transition"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StripePaymentModal;
