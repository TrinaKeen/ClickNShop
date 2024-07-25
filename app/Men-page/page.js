"use client"

import ProductList from './product-list';
import productsData from './products.json';
import { useState } from 'react';

export default function Page() {

const [products, setItems] = useState(productsData);

const handleAddItem = (newProduct) => {
    setProducts([...products, newProduct]);
};

return (
    <main className="min-h-screen bg-black p-4 text-white">
    <h1 className="text-3xl font-bold text-center mb-6">For Men</h1>
    
    {/* Pass the handleAddItem event handler to the NewItem component as a prop called onAddItem */}
    <newProduct onAddItem={handleAddItem} />

    {/* Pass the items state to the ItemList component as a prop */}
    <ProductList products={products} />
  </main>
);
}
