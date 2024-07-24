"use client"; // Ensure client-side rendering

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'; // Import CSS module
import Login from './login'; // Adjust import path if necessary
import HomePage from './page'; // Adjust import path if necessary

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = (email) => {
    setLoggedIn(true);
    setEmail(email);
    router.push('/'); // Redirect to the home page or wherever you need
  };

  return (
    <main className="bg-white py-6">
      {loggedIn ? (
        <HomePage email={email} setLoggedIn={setLoggedIn} />
      ) : (
        <Login setLoggedIn={setLoggedIn} setEmail={handleLogin} />
      )}
    </main>
  );
}
