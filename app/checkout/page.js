"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";


const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '' // Add country to customerInfo
  });
  const [cart, setCart] = useState([]);
  const [shippingFee, setShippingFee] = useState(0); // Add shippingFee state

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (customerInfo.country === 'Canada') {
      setShippingFee(10);
    } else if (customerInfo.country === 'United States') {
      setShippingFee(15);
    } else {
      setShippingFee(0);
    }
  }, [customerInfo.country]);

  const handleCardChange = (event) => {
    const { name, value } = event.target;
    const formattedValue = value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1-')
      .replace(/-$/, '')
      .slice(0, 19); // Limit to 19 characters (16 digits + 3 dashes)
    setCardDetails((prev) => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setPaymentError(null);
    setPaymentSuccess(null);

    // Simulating payment processing delay
    setTimeout(() => {
      // Mocking successful payment processing
      setPaymentSuccess(true);
      setLoading(false);
    }, 2000);
  };


  const formatAmount = (amount) => {
    return amount
      .toFixed(2) // Ensure 2 decimal places
      .replace(/\d(?=(\d{3})+\.)/g, '$&,'); // Add commas
  };
  const getTotalPrice = () => {
    return formatAmount(cart.reduce((total, item) => total + (item.price * item.quantity), 0));
  };
  
  const getGrandTotal = () => {
    return formatAmount(parseFloat(getTotalPrice().replace(/,/g, '')) + shippingFee);
  };
  
  
   

  return (
    <div className="min-h-screen bg-gray-50 p-8 lg:p-12 flex flex-col lg:flex-row lg:justify-between text-black">
      <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Checkout</h1>
        {paymentSuccess ? (
          <ThankYouPage query={{
            name: customerInfo.name,
            email: customerInfo.email,
            address: customerInfo.address,
            city: customerInfo.city,
            postalCode: customerInfo.postalCode,
            lastCardNumber: cardDetails.number.slice(-4),
            totalAmount: getGrandTotal(),
            items: JSON.stringify(cart),
          }} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" >Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={customerInfo.name}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="xxxx@gmail.com"
                    value={customerInfo.email}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={customerInfo.address}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={customerInfo.city}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={customerInfo.postalCode}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <select
                    name="country"
                    value={customerInfo.country}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                     <input
                        type="text"
                        name="number"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
            </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Expiration Month</label>
                  <input
                    type="text"
                    name="expMonth"
                    placeholder="MM/DD"
                    value={cardDetails.expMonth}
                    onChange={handleCardChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Expiration Year</label>
                  <input
                    type="text"
                    name="expYear"
                    placeholder="xxxx"
                    value={cardDetails.expYear}
                    onChange={handleCardChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    placeholder="xxx"
                    value={cardDetails.cvc}
                    onChange={handleCardChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
            {paymentError && <div className="mt-4 text-red-500 font-medium">{paymentError}</div>}
          </form>
        )}
      </div>
      <div className="lg:w-1/3 lg:ml-8 mt-8 lg:mt-0">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex items-center justify-between border-b border-gray-300 pb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-800 font-bold">CAD ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 font-bold text-right">
            <p>Subtotal: ${getTotalPrice()}</p>
            <p>Shipping Fee: ${shippingFee.toFixed(2)}</p>
            <p>Grand Total: ${getGrandTotal()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThankYouPage = ({ query }) => {
  const customerInfo = {
    name: query.name || '',
    email: query.email || '',
    address: query.address || '',
    city: query.city || '',
    postalCode: query.postalCode || '',
  };
 

  const lastCardNumber = query.lastCardNumber || '';
  const totalAmount = query.totalAmount || '0.00';
  const items = query.items ? JSON.parse(query.items) : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Thank You!</h1>
      <p className="text-lg mb-4">Your payment has been successfully processed. We appreciate your business!</p>
      
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-black">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Customer Information</h3>
          <p><strong>Name:</strong> {customerInfo.name}</p>
          <p><strong>Email:</strong> {customerInfo.email}</p>
          <p><strong>Address:</strong> {customerInfo.address}</p>
          <p><strong>City:</strong> {customerInfo.city}</p>
          <p><strong>Postal Code:</strong> {customerInfo.postalCode}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
          <p><strong>Last Card Number:</strong> **** **** **** {lastCardNumber}</p>
          <p><strong>Total Amount:</strong> ${totalAmount}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Items Purchased</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-gray-700">Quantity: {item.quantity}</p>
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div> <br/>
      
      <Link href="/" className="inline-block bg-gradient-to-r from-purple-400 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
       Back to Home
      
    </Link>
                        
    </div>
  );
};

export default CheckoutPage;
