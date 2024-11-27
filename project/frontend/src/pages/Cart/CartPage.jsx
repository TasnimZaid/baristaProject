import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CartComp from './CartComp';
import ProgressBar from './ProgressBar';



function CartPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <div className='grid  '>
                    <div className='mt-10'>

                        <ProgressBar></ProgressBar>
                        <CartComp></CartComp>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default CartPage;