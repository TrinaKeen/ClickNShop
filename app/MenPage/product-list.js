"use client"

import { useState } from "react";
import Product from './product';

export default function ProductList({ products }) {
    const [sortBy, setSortBy] = useState('name');
  
    const sortedProducts = [...products].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price.localeCompare(b.price);
      }
      return 0;
    });
  
    return (
      <div className="p-4 max-w-lg mx-auto text-black">
        <div className="flex justify-center mb-4 text-black">
          <button
            className={`px-4 py-2 mr-2 rounded ${sortBy === 'name' ? 'bg-orange-500 text-black' : 'bg-gray-200'}`}
            onClick={() => setSortBy('name')}
          >
            Apparel
          </button>
          {/* <button
            className={`px-4 py-2 rounded ${sortBy === 'price' ? 'bg-orange-500 text-black' : 'bg-gray-200'}`}
            onClick={() => setSortBy('price')}
          >
            Category 
          </button> */}
                   
        </div>
        <ul className="bg-black text-white shadow-md rounded">
          {sortedProducts.map(product => (
            <Product
              //key={product.id}
              name={product.name}
              price={product.price}
              details={product.details}
              image={product.image}
            />
          ))}
        </ul>
      </div>
    );
  }