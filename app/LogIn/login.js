"use client"; // Ensure client-side rendering

import { useState } from 'react';
import styles from './login.module.css'; // Import CSS module

export default function Login({ setLoggedIn, setEmail }) {
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    // Validate password
    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    // If all validations pass, perform authentication and navigation
    setLoggedIn(true);
    setEmail(email);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>Login</div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmailInput(ev.target.value)}
          className={styles.inputBox}
        />
        <label className={styles.errorLabel}>{emailError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={styles.inputBox}
        />
        <label className={styles.errorLabel}>{passwordError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          className={styles.inputButton}
          type="button"
          onClick={onButtonClick}
          value="Log in"
        />
      </div>
    </div>
  );
}
