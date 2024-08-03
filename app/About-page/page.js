"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const [cart, setCart] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleViewCart = () => {
    setShowCartPopup(true);
  };

  const handleCloseCartPopup = () => {
    setShowCartPopup(false);
  };

  const handleDeleteFromCart = (itemToRemove) => {
    const updatedCart = cart.filter(item => item !== itemToRemove);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    router.push('/checkout'); // Redirect to /checkout/page.js
  };

  return (
    <main className="bg-white text-black">
      <header className="bg-gray-800 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo2.jpg" alt="ClickNShop Logo" className="h-12 mr-4" />
            <h1 className="text-2xl font-bold">ClickNShop</h1>
          </div>
          <nav className="flex-1">
            <ul className="flex space-x-8 text-lg justify-center">
              <li className="hover:underline">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:underline">
                <Link href="/?category=men's clothing">Men</Link>
              </li>
              <li className="hover:underline">
                <Link href="/?category=women's clothing">Women</Link>
              </li>
              <li className="hover:underline">
                <Link href="/?category=jewelery">Accessories</Link>
              </li>
              <li className="hover:underline">
                <Link href="/?category=electronics">Electronics</Link>
              </li>
              <li className="hover:underline">
                <Link href="./About-page/">About</Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center">
            <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                placeholder="Search..."
              />
            </form>
            <button className="ml-4 hover:underline flex items-center" onClick={handleViewCart}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l1.6-8H6.4M7 13l-1 5m0 0h13m-13 0a1 1 0 001 1h10a1 1 0 001-1m-12-1h1.5m5 0h1.5"
                />
              </svg>
              <span className="ml-1">Cart ({cart.length})</span>
            </button>
          </div>
        </div>
      </header>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-center text-4xl font-bold mb-8">OUR STORY</h1>
        <div className="flex justify-center mb-8">
          <img src="/SAIT-image.png" alt="Our Story" className="rounded-md shadow-lg max-w-full h-auto" style={{ width: '600px', height: 'auto' }} />
        </div>
        <div className="max-w-4xl mx-auto text-lg">
          <p className="mb-6">
            Welcome to our Web Development project! We are Jonathan, Katrina, Prayus, and Shiraz, a group of enthusiastic college students currently studying at SAIT. Our journey into web development started with a shared passion for technology and a drive to create innovative web solutions.
          </p>
          <p className="mb-6">
            We began our project as a simple idea in our web development class, and it quickly grew into a collaborative effort that showcased our skills and creativity. Jonathan, with his knack for coding, Katrina, with her eye for design, Prayus, with his problem-solving abilities, and Shiraz, with his project management skills, all came together to bring this website to life.
          </p>
          <p className="mb-6">
            Our goal is to create a user-friendly, aesthetically pleasing, and functional web platform that not only meets the requirements of our coursework but also provides a valuable resource for anyone interested in web development. We hope you find our website informative and easy to navigate. Thank you for visiting!
          </p>
        </div>
      </section>
      {showCartPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-black">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cart.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-32 object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={() => handleDeleteFromCart(item)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between mt-4 font-bold">
              <p>Total:</p>
              <p>${getTotalPrice()}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={handleCloseCartPopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
