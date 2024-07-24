"use client"; // Ensure client-side rendering
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'; // Import CSS module
import Login from './login'; // Adjust import path if necessary

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const router = useRouter();

  const onButtonClick = () => {
    if (loggedIn) {
      // Log out logic
      setLoggedIn(false);
      setEmail('');
    } else {
      // Show login form
      setLoggedIn(true); // This line is to toggle for demonstration purposes
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setEmail(emailInput);
    router.push('/');
  };

  const handleChange = (e) => {
    setEmailInput(e.target.value);
  };

  return (
    <main >
      <section className="bg-white ">
    <header className="bg-white py-6 container mx-auto flex justify-between items-center">
      <img src="/logo2.jpg" alt="ClickNShop Logo" className="h-20" />
        <nav>
          <ul className="flex space-x-8 text-lg text-black">
            <li className="hover:underline">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:underline">
              <a>Men</a>
            </li>
            <li className="hover:underline">
              <a>Women</a>
            </li>
            <li className="hover:underline">
              <Link href="/item-page">Item Page</Link>
            </li>
            <li className="hover:underline">
              <Link href="/about">About</Link>
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
           
          </ul>
        </nav>
      </header>
      </section>
      <section className="bg-black-50 py-10 text-white">
      {loggedIn ? (
        <div className="container mx-auto text-white">
          <div className={styles.titleContainer}>
            <div>Welcome!</div>
          </div>
          <div>This is the home page.</div>
          <div className={styles.buttonContainer}>
            <input
              className={styles.inputButton}
              type="button"
              onClick={onButtonClick}
              value="Log out"
            />
            <div>Your email address is {email}</div>
          </div>
        </div>
      ) : (
        <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />
      )}
      </section>
    </main>
  );
}
