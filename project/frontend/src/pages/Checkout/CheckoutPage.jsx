import React, { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // Import your CheckoutForm component

const stripePromise = loadStripe('pk_test_51PeAmLGFMsHudRVCgSW72go7mjfilxpPFDqgl4N6RfOhbqYWnjyIL5cXJqkYfxSbjwY7YYtmBk8Zgb5qW70Fl9xZ00HSRj1lea');

const CheckoutPage = () => {
    const { items, cartTotal } = useCart();
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        const fetchPaymentRequest = async () => {
            const stripe = await stripePromise;
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Total',
                    amount: Math.round(cartTotal * 100), // Convert to cents
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            pr.canMakePayment().then((result) => {
                if (result) {
                    setPaymentRequest(pr);
                }
            });
        };

        fetchPaymentRequest();
    }, [cartTotal]);

    return (
        <Elements stripe={stripePromise}>
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                <div className="mb-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between mb-4">
                            <span>{item.name}</span>
                            <span>{item.price} JOD</span>
                        </div>
                    ))}
                </div>
                <div className="text-right mb-8">
                    <h2 className="text-xl font-semibold">Total: {cartTotal} JOD</h2>
                </div>
                {paymentRequest && (
                    <PaymentRequestButtonElement
                        options={{ paymentRequest }}
                    />
                )}
                <CheckoutForm cartTotal={cartTotal} /> {/* Pass cartTotal here */}
            </div>
        </Elements>
    );
};

export default CheckoutPage;