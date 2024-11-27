import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Link2 } from 'lucide-react';
import appleLogo from "../../assets/paymentMethodsLogo/applepayLogo.png"
import mastercardLogo from "../../assets/paymentMethodsLogo/mastercardLogo.png"
import stripeLogo from "../../assets/paymentMethodsLogo/stripeLogo.png"
import paypalLogo from "../../assets/paymentMethodsLogo/paypalLogo.png"
import visaLogo from "../../assets/paymentMethodsLogo/visaLogo.png"
import shippingIcon from "../../assets/paymentMethodsLogo/fast.png"

const CartComp = () => {
    const {
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
    } = useCart();

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);

    const applyDiscount = () => {
        // This is a simple example. In a real application, you'd validate the promo code against a database or API
        if (promoCode.toLowerCase() === 'discount10') {
            setDiscount(cartTotal * 0.1);
            setDiscountApplied(true);
        } else {
            alert('Invalid promo code');
            setDiscount(0);
            setDiscountApplied(false);
        }
    };

    const totalAfterDiscount = cartTotal - discount;



    return (
        <div className="container mx-auto p-6 font-sans">
            <div className='items-center mb-6 flex flex-row md:flex-row gap-6'>
                <h2 className="text-3xl font-bold">Your Brewed Basket</h2>
                <span className="text-sm">{totalItems} ITEM</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                    {items.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 mb-4 pb-4 border-b">
                            <img src={item.photos} alt={item.name} className="w-24 h-24 object-cover" />
                            <div className="flex-grow">
                                <h4 className="font-bold">{item.name}</h4>
                                <p className="text-sm text-gray-600">Description: {item.description}</p>
                                <div className="mt-2">
                                    <button onClick={() => removeItem(item.id)} className="text-sm underline mr-2 text-red-600">Delete</button>
                                    <button className="text-sm underline">Move to Wishlist</button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <select
                                    value={item.quantity}
                                    onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
                                    className="mr-4 p-1 border rounded"
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <span className="font-bold">${item.price.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6">
                        <h4 className="font-bold mb-2">NEED HELP?</h4>
                        <ul className="space-y-1">
                            <li><Link to="/contact" className="text-sm text-gray-600 hover:underline">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

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
                                - {discount.toFixed(2)} JOD
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
                            className="flex-grow bg-white border p-3 rounded-l"
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
                        <div className="flex gap-2 w-12">
                            <img src={visaLogo} alt="Visa" />
                            <img src={mastercardLogo} alt="Mastercard" />
                            <img src={paypalLogo} alt="PayPal" />
                            <img src={appleLogo} alt="Apple Pay" />
                            <img src={stripeLogo} alt="Stripe" />

                        </div>
                    </div>

                    <div className="mt-6 flex flex-col ">
                        <Link to="/checkout">
                            <button className="bg-black text-white px-6 py-3 mt-4 w-14 md:w-auto  ">
                                CHECKOUT →
                            </button>
                        </Link>
                        {/* <div className="flex items-center mt-4">
                            <img src={shippingIcon} alt="Shipping icon" className="mr-2 w-6" />
                            <span className="text-sm">Free Shipping</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartComp;