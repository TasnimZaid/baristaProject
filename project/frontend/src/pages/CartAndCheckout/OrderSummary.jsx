import React from 'react';
import { useCart } from 'react-use-cart';
import visaLogo from "../../assets/paymentMethodsLogo/visaLogo.png"
import mastercardLogo from "../../assets/paymentMethodsLogo/mastercardLogo.png"
import paypalLogo from "../../assets/paymentMethodsLogo/paypalLogo.png"
import applepayLogo from "../../assets/paymentMethodsLogo/applepayLogo.png"
import stripeLogo from "../../assets/paymentMethodsLogo/stripeLogo.png"

const OrderSummary = ({ promoCode, setPromoCode, discount, discountApplied, applyDiscount, nextStep }) => {
    const { totalItems, cartTotal } = useCart();
    const totalAfterDiscount = cartTotal - (discountApplied ? discount : 0); // Apply discount only if it's applied

    return (
        <div className="md:w-1/3">
            <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-bold mb-4">ORDER SUMMARY:</h3>
                <div className="flex justify-between mb-2">
                    <span>Products</span>
                    <span>{totalItems} Items</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Total</span>
                    <span>{cartTotal.toFixed(2)} JOD</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Discount</span>
                    <span className={discountApplied ? "text-green-600" : ""}>
                        {discountApplied ? `- ${discount.toFixed(2)} JOD` : '0 JOD'}
                    </span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Delivery</span>
                    <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>{totalAfterDiscount.toFixed(2)} JOD</span>
                </div>
            </div>

            <div className="mt-4 flex">
                <input
                    className="w-full border border-gray-400 p-2 focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder='PROMO CODE'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                    className="bg-black text-white px-4 rounded-r"
                    onClick={applyDiscount}
                >
                    Apply
                </button>
            </div>

            <div className="mt-6">
                <h4 className="font-bold mb-2">ACCEPTED PAYMENT METHODS</h4>
                <div className="flex gap-2">
                    <img src={visaLogo} className="h-10"></img>
                    <img src={mastercardLogo} className="h-10"></img>
                    <img src={paypalLogo} className="h-10"></img>
                    <img src={applepayLogo} className="h-10"></img>
                    <img src={stripeLogo} className="h-10"></img>
                    {/* {['visa', 'mastercard', 'paypal', 'applepay', 'stripe'].map((method) => (
                        <img key={method} src={applepayLogo} alt={method} className="h-8" />
                    ))} */}
                </div>
            </div>
            <div className='flex flex-col' >
                <button
                    onClick={nextStep}
                    className="bg-black text-white px-6 py-3 rounded-md hover:bg-zinc-700 transition duration-300 mt-10 "
                >
                    Continue →
                </button>

            </div>
        </div>
        
    );
};

export default OrderSummary;