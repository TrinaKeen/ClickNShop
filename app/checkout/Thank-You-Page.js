"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation';

const ThankYouPage = ({ query }) => {
    const router = useRouter();
  
    const clearCart = () => {
      localStorage.removeItem('cart');
      router.push('/'); 
    };
  
    const customerInfo = {
      name: query.name || '',
      email: query.email || '',
      address: query.address || '',
      phoneNumber: query.phoneNumber || '',
      city: query.city || '',
      postalOrZipCode: query.postalOrZipCode || '',
      stateOrProvince: query.stateOrProvince || ''
    };
  
    const lastCardNumber = query.lastCardNumber || '';
    const totalAmount = query.totalAmount || '0.00';
    const items = query.items ? JSON.parse(query.items) : [];
  
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">🎉 Thank You!</h1>
        <p className="text-lg text-gray-600 mb-8">Your payment has been successfully processed. We appreciate your business!</p>
        
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full text-black">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <div className="mb-6 border-b border-gray-300 pb-4">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Customer Information</h3>
            <p className="text-gray-600"><strong>Name:</strong> {customerInfo.name}</p>
            <p className="text-gray-600"><strong>Email:</strong> {customerInfo.email}</p>
            <p className="text-gray-600"><strong>Phone Number:</strong> {customerInfo.phoneNumber}</p>
            <p className="text-gray-600"><strong>Address:</strong> {customerInfo.address}</p>
            <p className="text-gray-600"><strong>City:</strong> {customerInfo.city}</p>
            <p className="text-gray-600"><strong>{customerInfo.country === 'United States' ? 'Zip Code' : 'Postal Code'}:</strong> {customerInfo.postalOrZipCode}</p>
            <p className="text-gray-600"><strong>{customerInfo.country === 'United States' ? 'State' : 'Province'}:</strong> {customerInfo.stateOrProvince}</p>
          </div>
          
          <div className="mb-6 border-b border-gray-300 pb-4">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Payment Details</h3>
            <p className="text-gray-600"><strong>Last Card Number:</strong> **** **** **** {lastCardNumber}</p>
            <p className="text-gray-600"><strong>Total Amount:</strong> ${totalAmount}</p>
          </div>
  
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Items Purchased</h3>
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li key={index} className="flex items-center border-b border-gray-200 pb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-lg shadow-sm mr-6"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-800 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div> <br/>
        <button
          onClick={clearCart}
          className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Back to Home
        </button>
      </div>
    );
};

export default ThankYouPage;
