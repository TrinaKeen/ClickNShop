import { CartProvider } from '../context/CartContext'; // Adjust the path as needed

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
