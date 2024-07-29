"use client";

import { useCart } from '../context/CartContext'; // Adjust the path as needed

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="border p-4 mb-4 rounded bg-white shadow">
              <div className="flex justify-between items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                <div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-lg">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
