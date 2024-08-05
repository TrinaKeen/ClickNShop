"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ItemList from "./Item-page/components/ItemList";
import { useRouter, useSearchParams } from 'next/navigation';

export default function HomePage({ email, setLoggedIn }) {
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedItem, setSelectedItem] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showCartPopup, setShowCartPopup] = useState(false);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        const category = searchParams.get('category');
        setSelectedCategory(category || 'all');
      }, [searchParams]);
    
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };
    
      const filteredItems = items.filter(item => {
        const categoryMatch = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase();
        const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
      });

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedItem(null);
        setQuantity(1);
    };

    const handleAddToCart = () => {
        if (selectedItem && quantity > 0) {
            const updatedCart = [...cart, { ...selectedItem, quantity }];
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            handleClosePopup();
        }
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(99, parseInt(e.target.value, 10)));
        setQuantity(value || 1);
    };

    const handleViewCart = () => {
        setShowCartPopup(true);
    };

    const handleCloseCartPopup = () => {
        setShowCartPopup(false);
    };

    const handleDeleteFromCart = (itemToRemove) => {
        const updatedCart = cart.filter(item => item !== itemToRemove);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleCheckout = () => {
        router.push('/checkout'); // Redirect to /checkout/page.js
    };

    return (
        <main className="bg-white text-black">
            <header className="bg-gray-800 text-white py-4 px-6 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="/">
                        <img src="/logo2.jpg" alt="ClickNShop Logo" className="h-12 mr-4" />
                        </a>
                        <a href="/">
                        <h1 className="text-2xl font-bold">ClickNShop</h1>
                        </a>
                    </div>
                    <nav className="flex-1">
                        <ul className="flex space-x-8 text-lg justify-center">
                            <li className="hover:underline">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="hover:underline">
                                <Link href="/?category=men's clothing">Men</Link>
                            </li>
                            <li className="hover:underline">
                                <Link href="/?category=women's clothing">Women</Link>
                            </li>
                            <li className="hover:underline">
                                <Link href="/?category=jewelry">Accessories</Link>
                            </li>
                            <li className="hover:underline">
                                <Link href="/?category=electronics">Electronics</Link>
                            </li>
                            <li className="hover:underline">
                                <Link href="./About-page/">About</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-center">
                        <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                                placeholder="Search..."
                            />
                        </form>
                        <button className="ml-4 hover:underline flex items-center" onClick={handleViewCart}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l1.6-8H6.4M7 13l-1 5m0 0h13m-13 0a1 1 0 001 1h10a1 1 0 001-1m-12-1h1.5m5 0h1.5"
                                />
                            </svg>
                            <span className="ml-1">Cart ({cart.length})</span>
                        </button>
                    </div>
                </div>
            </header>
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="bg-blue-300 text-center py-3 rounded-lg shadow-md mb-4 relative">
                    <div className="absolute top-0 left-0 w-9 h-9 bg-red-500 text-white flex items-center justify-center font-bold rounded-full transform -translate-y-1/2 -translate-x-1/2">
                        50%
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                        ClickNShop Sale!
                    </h1>
                    <h2 className="text-2xl text-gray-700">
                        Up to 50% Off
                    </h2>
                    <button className="mt-4 text-white bg-green-500 py-2 px-4 rounded shadow">
                        Shop Now
                    </button>
                </div>
                <ItemList items={filteredItems} onItemClick={handleItemClick} />
                {showPopup && selectedItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-black">
                            <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.title}
                                style={{ width: '300px', height: '300px', objectFit: 'contain' }}
                                className="mb-4"
                            />
                            <p className="mb-4">{selectedItem.description}</p>
                            <p className="font-bold text-xl mt-auto">${selectedItem.price.toFixed(2)}</p>
                            <div className="flex items-center mb-4">
                                <label htmlFor="quantity" className="mr-2">Quantity:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="border border-gray-300 p-1 rounded w-16"
                                    min="1"
                                    max="99"
                                />
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    onClick={handleClosePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showCartPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-black relative">
                            <h2 className="text-2xl font-bold mb-4">Cart</h2>
                            <div className="overflow-y-auto max-h-80">
                                {cart.length === 0 ? (
                                    <p className="text-center">Your cart is empty.</p>
                                ) : (
                                    <ul>
                                        {cart.map((item, index) => (
                                            <li key={index} className="flex items-center mb-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-32 h-32 object-cover mr-4"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold">{item.title}</h3>
                                                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                                                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <button
                                                    className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    onClick={() => handleDeleteFromCart(item)}
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="flex justify-between mt-4 font-bold">
                                <p>Total:</p>
                                <p>${getTotalPrice()}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>
                                <button
                                    className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    onClick={handleCloseCartPopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
