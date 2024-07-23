"use client"

import { useState } from "react";
import Item from './item';
// import itemsData from './items.json';

export default function ItemList({ items }) {
    const [sortBy, setSortBy] = useState('name');
  
    // Create a copy of itemsData and sort it based on sortBy state
    const sortedItems = [...items].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  
    // Render function
    return (
      <div className="p-4 max-w-lg mx-auto text-black">
        <div className="flex justify-center mb-4 text-black">
          <button
            className={`px-4 py-2 mr-2 rounded ${sortBy === 'name' ? 'bg-orange-500 text-black' : 'bg-gray-200'}`}
            onClick={() => setSortBy('name')}
          >
            Name
          </button>
          <button
            className={`px-4 py-2 rounded ${sortBy === 'category' ? 'bg-orange-500 text-black' : 'bg-gray-200'}`}
            onClick={() => setSortBy('category')}
          >
            Category
          </button>
          {/* Additional button for grouped category sorting */}
          <button
            className={`px-4 py-2 ml-2 rounded ${sortBy === 'groupedCategory' ? 'bg-orange-500 text-black' : 'bg-gray-200'}`}
            onClick={() => setSortBy('groupedCategory')}
          >
            Grouped Category
          </button>
        </div>
        <ul className="bg-black text-white shadow-md rounded">
          {/* Map over sortedItems to render each item */}
          {sortedItems.map(item => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      </div>
    );
  }