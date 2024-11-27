import React, { useState, useEffect } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Lottie from 'react-lottie';
import successAnimation from './animation/success-coffee-animation2.json'; // You'll need to provide this animation file
import errorAnimation from './animation/error-coffee-animation.json'; // You'll need to provide this animation file
import loadingAnimation from './animation/loading-coffee-animation.json'; // You'll need to provide this animation file

const Modal = ({ isOpen, onClose, type, message }) => {
    const animations = {
        success: successAnimation,
        error: errorAnimation,
        loading: loadingAnimation,
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animations[type],
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    if (!isOpen) return null;

    const titles = {
        success: 'Payment Successful',
        error: 'Payment Failed',
        loading: 'Processing Payment',
    };

    const buttonTexts = {
        success: 'Continue',
        error: 'Try Again',
        loading: 'Please Wait...',
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <div className="w-64 h-64 mx-auto">
                    <Lottie options={defaultOptions} />
                </div>
                <h2 className="text-2xl font-bold text-center mt-4">{titles[type]}</h2>
                <p className="text-center mt-2">{message}</p>
                {type !== 'loading' && (
                    <button
                        onClick={onClose}
                        className={`mt-6 w-full text-white rounded-md py-2 px-4 ${type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                            }`}
                    >
                        {buttonTexts[type]}
                    </button>
                )}
            </div>
        </div>
    );
};

const CheckoutForm = ({ cartTotal, nextStep }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [paymentRequest, setPaymentRequest] = useState(null);
    const [modalState, setModalState] = useState({ isOpen: false, type: '', message: '' });

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Total',
                    amount: Math.round(cartTotal * 100),
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            pr.canMakePayment().then(result => {
                if (result) {
                    setPaymentRequest(pr);
                }
            });
        }
    }, [stripe, cartTotal]);

    const handleCardPayment = async (event) => {
        event.preventDefault();
        setModalState({ isOpen: true, type: 'loading', message: 'Processing your payment...' });

        if (!stripe || !elements) {
            setModalState({ isOpen: true, type: 'error', message: 'Stripe has not loaded correctly.' });
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setModalState({ isOpen: true, type: 'error', message: error.message });
                return;
            }

            const response = await axios.post('http://localhost:3000/api/payment', {
                amount: Math.round(cartTotal * 100),
                payment_method: paymentMethod.id,
            });

            if (response.data.success) {
                setModalState({ isOpen: true, type: 'success', message: 'Your payment was processed successfully!' });
            } else {
                setModalState({ isOpen: true, type: 'error', message: 'Payment failed. Please try again.' });
            }
        } catch (error) {
            setModalState({ isOpen: true, type: 'error', message: 'An unexpected error occurred. Please try again.' });
        }
    };

    useEffect(() => {
        if (paymentRequest) {
            paymentRequest.on('paymentmethod', async (event) => {
                setModalState({ isOpen: true, type: 'loading', message: 'Processing your Apple Pay payment...' });
                try {
                    const { paymentIntent, error } = await stripe.confirmCardPayment(
                        event.paymentMethod.id,
                        { payment_method: event.paymentMethod.id }
                    );

                    if (error) {
                        event.complete('fail');
                        setModalState({ isOpen: true, type: 'error', message: `Apple Pay Failed: ${error.message}` });
                    } else {
                        event.complete('success');
                        setModalState({ isOpen: true, type: 'success', message: 'Your Apple Pay payment was successful!' });
                    }
                } catch (err) {
                    setModalState({ isOpen: true, type: 'error', message: `Apple Pay Error: ${err.message}` });
                }
            });
        }
    }, [paymentRequest, stripe]);

    const closeModal = () => {
        setModalState({ ...modalState, isOpen: false });
        if (modalState.type === 'success') {
            nextStep();
        }
    };

    return (
        <>
            <form onSubmit={handleCardPayment} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
                <div className="flex justify-between ">
                    <label className={`flex items-center border p-2 rounded-md cursor-pointer ${paymentMethod === 'creditCard' ? 'border-blue-500 shadow-lg' : 'border-gray-300'}`}>
                        <input
                            className="appearance-none"
                            type="radio"
                            value="creditCard"
                            checked={paymentMethod === 'creditCard'}
                            onChange={() => setPaymentMethod('creditCard')}
                        />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6 ml-2" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-6 ml-2" />
                    </label>

                    <label className={`flex items-center border p-2 rounded-md cursor-pointer ${paymentMethod === 'apple' ? 'border-blue-500 shadow-lg' : 'border-gray-300'}`}>
                        <input
                            className="appearance-none"
                            type="radio"
                            value="apple"
                            checked={paymentMethod === 'apple'}
                            onChange={() => setPaymentMethod('apple')}
                        />
                        <img src="https://wallpapers.com/images/hd/white-apple-pay-logo-msnykrqjc4mr4ldx-2.jpg" alt="Apple Pay" className="h-10 ml-2" />
                    </label>
                </div>

                {paymentMethod === 'apple' && paymentRequest && (
                    <PaymentRequestButtonElement options={{ paymentRequest }} />
                )}

                {paymentMethod === 'creditCard' && (
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-gray-700">Cardholder's Name</label>
                            <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none" placeholder="John Doe" required />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700">Card Number</label>
                            <div className="border border-gray-300 rounded-md p-2">
                                <CardNumberElement
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

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-700">Valid Thru</label>
                                <div className="border border-gray-300 rounded-md p-2">
                                    <CardExpiryElement
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

                {paymentMethod === 'creditCard' && (
                    <button type="submit" disabled={!stripe} className="w-full bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700">
                        Pay Now
                    </button>
                )}
            </form>

            <Modal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                type={modalState.type}
                message={modalState.message}
            />
        </>
    );
};

export default CheckoutForm;