import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { useCart } from 'react-use-cart';
import CartContent from './CartContent';
import DeliveryForm from './DeliveryForm';
import CheckoutForm from './CheckoutForm';
import OrderConfirmation from './OrderConfirmation';
import ProgressBar from './ProgressBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const stripePromise = loadStripe('pk_test_51PeAmLGFMsHudRVCgSW72go7mjfilxpPFDqgl4N6RfOhbqYWnjyIL5cXJqkYfxSbjwY7YYtmBk8Zgb5qW70Fl9xZ00HSRj1lea');

const CartCheckoutFlow = () => {
    const [step, setStep] = useState(1);
    const [deliveryInfo, setDeliveryInfo] = useState({});
    const { cartTotal } = useCart();

    

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (

        <Elements stripe={stripePromise}>

            <Navbar></Navbar>
            <div className="container mx-auto p-6 font-sans">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <h2 className="text-3xl font-bold mb-2">Your Brewed Basket</h2>
                    <ProgressBar step={step} />
                </motion.div>

                {step === 1 && <CartContent nextStep={nextStep} />}
                {step === 2 && <DeliveryForm nextStep={nextStep} prevStep={prevStep} setDeliveryInfo={setDeliveryInfo} />}
                {step === 3 && <CheckoutForm cartTotal={cartTotal} nextStep={nextStep} prevStep={prevStep} deliveryInfo={deliveryInfo} />}
                {step === 4 && <OrderConfirmation deliveryInfo={deliveryInfo} />}
            </div>


        </Elements>
    );
};

export default CartCheckoutFlow;