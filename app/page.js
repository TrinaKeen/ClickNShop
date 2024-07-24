"use client"; // Ensure client-side rendering

import Link from "next/link";

export default function HomePage({ email, setLoggedIn }) {
  const onButtonClick = () => {
    setLoggedIn(false);
  };

  return (
    <main className="bg-white py-6">
      <header className="container mx-auto flex justify-between items-center">
        <img src="/logo2.jpg" alt="ClickNShop Logo" className="h-20" />
        <nav>
          <ul className="flex space-x-8 text-lg text-black">
            <li className="hover:underline">
              <Link href="../">Home</Link>
            </li>
            <li className="hover:underline">
              <a>Men</a>
            </li>
            <li className="hover:underline">
              <a>Women</a>
            </li>
            <li className="hover:underline">
              <Link href="./Item-page/pages/">Item Page</Link>
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

     
    </main>
  );
}
