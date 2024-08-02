"use client";

import React, { useState, useEffect } from 'react';
import ThankYouPage from './Thank-You-Page'; 

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expDate: '',
    cvc: '',
    cardholderName: ''
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalOrZipCode: '',
    country: '',
    stateOrProvince: '' 
  });
  const [cart, setCart] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);

  const provinces = [
    { label: 'Alberta', value: 'AB' },
    { label: 'British Columbia', value: 'BC' },
    { label: 'Manitoba', value: 'MB' },
    { label: 'New Brunswick', value: 'NB' },
    { label: 'Newfoundland and Labrador', value: 'NL' },
    { label: 'Nova Scotia', value: 'NS' },
    { label: 'Ontario', value: 'ON' },
    { label: 'Prince Edward Island', value: 'PE' },
    { label: 'Quebec', value: 'QC' },
    { label: 'Saskatchewan', value: 'SK' },
  ];

  const states = [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' },
  ];

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
    let formattedValue = value.replace(/\D/g, ''); 
    if (name === 'number') {
      formattedValue = formattedValue.slice(0, 16).replace(/(.{4})/g, '$1-').replace(/-$/, ''); 
    } else if (name === 'expDate') {
      if (formattedValue.length >= 3) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      formattedValue = formattedValue.slice(0, 5);
    } else if (name === 'cvc') {
      formattedValue = formattedValue.slice(0, 3);
    } else if (name === 'cardholderName') {
      formattedValue = value; 
    }
    setCardDetails((prev) => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;
    if (name === 'postalOrZipCode') {
      if (customerInfo.country === 'United States') {
        formattedValue = value.replace(/\D/g, '').slice(0, 5); 
      } else if (customerInfo.country === 'Canada') {
        formattedValue = value.slice(0, 6);
      }
    } else if (name === 'city') {
      formattedValue = value.replace(/[^a-zA-Z\s]/g, ''); 
    }
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validatePaymentInfo = (cardDetails) => {
    const cardNumberValid = /^\d{16}$/.test(cardDetails.number.replace(/-/g, ''));
    const expDateValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expDate); 
    const cvcValid = /^\d{3}$/.test(cardDetails.cvc);
    const cardholderNameValid = cardDetails.cardholderName.trim() !== ''; 
    return { cardNumberValid, expDateValid, cvcValid, cardholderNameValid };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setPaymentError(null);
    setPaymentSuccess(null);

    const { cardNumberValid, expDateValid, cvcValid, cardholderNameValid } = validatePaymentInfo(cardDetails);
    if (!cardNumberValid || !expDateValid || !cvcValid || !cardholderNameValid) {
      setPaymentError("Invalid payment information. Please check your card details.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setPaymentSuccess(true);
      setLoading(false);
    }, 2000);
  };

  const formatAmount = (amount) => {
    return amount
      .toFixed(2) 
      .replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
  };

  const getTotalPrice = () => {
    return formatAmount(cart.reduce((total, item) => total + (item.price * item.quantity), 0));
  };

  const getGrandTotal = () => {
    return formatAmount(parseFloat(getTotalPrice().replace(/,/g, '')) + shippingFee);
  };

  if (paymentSuccess) {
    return (
      <ThankYouPage 
        query={{
          name: customerInfo.name,
          email: customerInfo.email,
          address: customerInfo.address,
          city: customerInfo.city,
          postalOrZipCode: customerInfo.postalOrZipCode,
          stateOrProvince: customerInfo.stateOrProvince,
          lastCardNumber: cardDetails.number.slice(-4),
          totalAmount: getGrandTotal(),
          items: JSON.stringify(cart),
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 lg:p-12 flex flex-col lg:flex-row lg:justify-between text-black">
      <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Checkout</h1>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
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
                <label className="block text-sm font-medium mb-2">
                  {customerInfo.country === 'United States' ? 'Zip Code' : 'Postal Code'}
                </label>
                <input
                  type="text"
                  name="postalOrZipCode"
                  placeholder={customerInfo.country === 'United States' ? 'Zip Code' : 'Postal Code'}
                  value={customerInfo.postalOrZipCode}
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
              {customerInfo.country === 'Canada' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Province</label>
                  <select
                    name="stateOrProvince"
                    value={customerInfo.stateOrProvince}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province.value} value={province.value}>{province.label}</option>
                    ))}
                  </select>
                </div>
              )}
              {customerInfo.country === 'United States' && (
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <select
                    name="stateOrProvince"
                    value={customerInfo.stateOrProvince}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>{state.label}</option>
                    ))}
                  </select>
                </div>
              )}
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
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  placeholder="Cardholder Name"
                  value={cardDetails.cardholderName}
                  onChange={handleCardChange}
                  className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Expiration Date</label>
                <input
                  type="text"
                  name="expDate"
                  placeholder="MM/YY"
                  value={cardDetails.expDate}
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
            {loading ? 'Processing...' : 'Purchase Now'}
          </button>
          {paymentError && <div className="mt-4 text-red-500 font-medium">{paymentError}</div>}
        </form>
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
                    <p className="text-gray-800 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
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

export default CheckoutPage;
