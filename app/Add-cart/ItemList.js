"use client";

import { useCart } from '../context/CartContext'; // Adjust the path as needed

export default function ItemList({ items }) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="border p-4 rounded shadow">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover mb-4" />
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          <p className="text-lg mb-2">${item.price}</p>
          <button
            onClick={() => addToCart(item)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
