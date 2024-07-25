"use client"; 

import Link from "next/link";
import { useEffect, useState } from "react";
import ItemList from "./Item-page/components/ItemList"; 

export default function HomePage({ email, setLoggedIn }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setItems(data);
    };

    fetchProducts();
  }, []);

  const onButtonClick = () => {
    setLoggedIn(false);
  };

  return (
    <main className="bg-white py-6">
      <header className="container mx-auto flex justify-between items-center">
        <img src="/logo2.jpg" alt="ClickNShop Logo" className="h-20" />
        <nav>
          <ul className="flex space-x-8 text-lg text-black">
            <li className="hover:underline"><Link href="/">Home</Link></li>
            <li className="hover:underline"><Link href="./Men-page/">Men</Link></li>
            <li className="hover:underline"><Link href="./Women-page/">Women</Link></li>
            <li className="hover:underline"><Link href="./About-page/">About</Link></li>
            <li>
              <form className="flex items-center">
                <input type="text" className="border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Search..."/>
                <button type="submit" className="bg-gray-300 text-white p-1 rounded-r-md hover:bg-blue-700">Search</button>
              </form>
            </li>
            <li className="hover:underline"><Link href="./LogIn/">Login</Link></li>
          </ul>
        </nav>
      </header>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-8">ClickNShop Items</h1>
        <ItemList items={items} />
      </div>
    </main>
  );
}
