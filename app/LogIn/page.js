"use client"; // Add this directive to enable client-side features

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const onButtonClick = () => {
    if (loggedIn) {
      // Log out logic here
      setLoggedIn(false);
      setEmail('');
    } else {
      // Navigate to login page
      router.push('/login');
    }
  };

  return (
    <main className="mainContainer">
      <div className="titleContainer">
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </main>
  );
}
