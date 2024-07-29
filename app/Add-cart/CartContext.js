"use client";

import { createContext, useContext, useState } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the CartContext
export function useCart() {
  return useContext(CartContext);
}
