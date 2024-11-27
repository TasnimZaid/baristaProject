import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ cartTotal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [loading, setLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setPaymentError(null);
        setPaymentSuccess(null);

        if (!stripe || !elements) {
            setPaymentError('Stripe has not loaded correctly.');
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setPaymentError(error.message);
                setLoading(false);
                return;
            }

            const response = await axios.post('http://localhost:3000/api/payment', {
                amount: Math.round(cartTotal * 100),
                payment_method: paymentMethod.id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                setPaymentSuccess('Payment successful!');
            } else {
                setPaymentError('Payment failed. Please try again.');
            }
        } catch (error) {
            setPaymentError('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-6">
                <div className="w-1/4 text-center">
                    <div className="w-full h-1 bg-red-500"></div>
                    <span className="text-sm mt-1 text-gray-500">Delivery</span>
                </div>
                <div className="w-1/4 text-center">
                    <div className="w-full h-1 bg-red-500"></div>
                    <span className="text-sm mt-1 text-gray-500">Confirmation</span>
                </div>
                <div className="w-1/4 text-center">
                    <div className="w-full h-1 bg-red-500"></div>
                    <span className="text-sm mt-1 text-gray-500">Payment</span>
                </div>
                <div className="w-1/4 text-center">
                    <div className="w-full h-1 bg-gray-300"></div>
                    <span className="text-sm mt-1 text-gray-500">Finish</span>
                </div>
            </div>

            {/* Payment Method Selection */}
            <div className="flex justify-between">
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="creditCard"
                        checked={paymentMethod === 'creditCard'}
                        onChange={() => setPaymentMethod('creditCard')}
                    />
                    <span className="text-gray-700">Pay with Credit Card</span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-6" />
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                    />
                    <span className="text-gray-700">Pay with PayPal</span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                </label>
            </div>

            {/* Card Information */}
            {paymentMethod === 'creditCard' && (
                <div className="space-y-4">
                    {/* Cardholder's Name */}
                    <div className="flex flex-col">
                        <label className="text-gray-700">Cardholder's Name</label>
                        <input type="text" className="border-gray-300 rounded-md p-2" placeholder="John Doe" required />
                    </div>

                    {/* Card Number */}
                    <div className="flex flex-col">
                        <label className="text-gray-700">Card Number</label>
                        <div className="border border-gray-300 rounded-md p-2">
                            <CardNumberElement
                                className="p-2"
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* Expiry and CVC */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-700">Valid Thru</label>
                            <div className="border border-gray-300 rounded-md p-2">
                                <CardExpiryElement
                                    className="p-2"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#424770',
                                                '::placeholder': {
                                                    color: '#aab7c4',
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-700">CVC</label>
                            <div className="border border-gray-300 rounded-md p-2">
                                <CardCvcElement
                                    className="p-2"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#424770',
                                                '::placeholder': {
                                                    color: '#aab7c4',
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
                <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Back</button>
                <button
                    type="submit"
                    className={`px-4 py-2 text-white rounded-md ${loading ? 'bg-gray-500' : 'bg-red-500'} hover:bg-red-600 transition duration-300`}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Next Step'}
                </button>
            </div>

            {/* Error and Success Messages */}
            {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
            {paymentSuccess && <p className="text-green-500 mt-4">{paymentSuccess}</p>}
        </form>
    );
};

export default CheckoutForm;