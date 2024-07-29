// Home.js (or your main component file)
"use client";

import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'; // Import CSS module
import Login from './login'; // Adjust import path if necessary


export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const onLogout = () => {
    setLoggedIn(false);
    setEmail('');
  };

  return (
    <main>
      <section className="bg-white">
        <header className="bg-white py-6 container mx-auto flex justify-between items-center">
          <img src="/logo2.jpg" alt="ClickNShop Logo" className="h-20" />
          <nav>
            <ul className="flex space-x-8 text-lg text-black">
              <li className="hover:underline">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:underline">
                <Link href="./Men-page/">Men</Link>
              </li>
              <li className="hover:underline">
                <Link href="./Women-page/">Women</Link>
              </li>
              <li className="hover:underline">
                <Link href="./About-page/">About</Link>
              </li>
              <li>
                <form className="flex items-center">
                  <input
                    type="text"
                    className="border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Search..."
                  />
                  <button
                    type="submit"
                    className="bg-gray-300 text-white p-1 rounded-r-md hover:bg-blue-700"
                  >
                    Search
                  </button>
                </form>
              </li>
              <li className="hover:underline">
                <Link href="./LogIn/">Login</Link>
              </li>
            </ul>
          </nav>
        </header>
      </section>
      <section className="bg-black-50 py-10 text-white">
        {loggedIn ? (
          <HomePage email={email} setLoggedIn={setLoggedIn} />
        ) : (
          <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />
        )}
      </section>
    </main>
  );
}
