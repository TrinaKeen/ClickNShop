import Link from "next/link";
import { FaSearch } from 'react-icons/fa';

export default function HomePage() {
	return (
		<main className="bg-white py-6">
			<header>
				<div >
					<img src="/logo.jpg" alt="ClickNShop Logo" className="mx-auto mb-4" style={{ height: '100px' }}/>
					<div className="container mx-auto text-center">
						<nav className="mt-4">
							<ul className="flex justify-center space-x-32 text-lg">
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
							</ul>
						</nav>
					</div>
				</div>
			</header>
		</main>
	);
}


