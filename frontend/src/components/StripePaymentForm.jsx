import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AlertCircle, Loader } from 'lucide-react';

const StripePaymentForm = ({ clientSecret, amount, invoiceNumber, onSuccess, onError, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            const msg = 'Stripe not loaded. Please refresh the page.';
            console.error(msg);
            setError(msg);
            onError?.(msg);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/invoices?payment=success`,
                },
                redirect: 'if_required',
            });

            if (stripeError) {
                console.error('Stripe error:', stripeError.message);
                setError(stripeError.message);
                onError?.(stripeError.message);
            } else if (paymentIntent) {
                console.log('Payment successful:', paymentIntent.status);
                
                if (paymentIntent.status === 'succeeded') {
                    onSuccess?.(paymentIntent);
                } else if (paymentIntent.status === 'processing') {
                    onSuccess?.(paymentIntent);
                } else {
                    setError(`Payment status: ${paymentIntent.status}`);
                }
            }
        } catch (err) {
            console.error('Payment error:', err);
            const msg = err.message || 'Payment processing failed';
            setError(msg);
            onError?.(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Invoice:</span> {invoiceNumber}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-1">
                    Amount to Pay: <span className="text-[#0088FF]">₹{amount.toFixed(2)}</span>
                </p>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Payment Details
                </label>
                <PaymentElement />
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Test card: 4242 4242 4242 4242, any future date, any CVC
                </p>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-red-900">Payment Error</p>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                </div>
            )}

            <div className="space-y-3 pt-4">
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full bg-[#0088FF] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#0070d2] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <Loader className="h-5 w-5 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        `Pay ₹${amount.toFixed(2)}`
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 transition-all"
                >
                    Cancel
                </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-xs text-gray-600">
                    💳 <span className="font-semibold">Secure Payment:</span> Your payment is secured with Stripe's industry-standard encryption.
                </p>
            </div>
        </form>
    );
};

export default StripePaymentForm;
