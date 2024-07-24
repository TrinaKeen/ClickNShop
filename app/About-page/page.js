import Link from "next/link";

export default function AboutPage() {
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
            <section className="container mx-auto px-4 py-12">
                <h1 className="text-center text-4xl font-bold mb-8" >OUR STORY</h1>
                    <div className="flex justify-center mb-8">
                        <img src="/SAIT-image.png" alt="Our Story" className="rounded-md shadow-lg max-w-full h-auto" style={{ width: '600px', height: 'auto' }}/>
                    </div>
                    <div className="max-w-4xl mx-auto text-lg">
                        <p className="mb-6">
                        Welcome to our Web Development project! We are Jonathan, Katrina, Prayus, and Shiraz, a group of enthusiastic college students currently studying at SAIT. Our journey into web development started with a shared passion for technology and a drive to create innovative web solutions.
                        </p>
                        <p className="mb-6">
                        We began our project as a simple idea in our web development class, and it quickly grew into a collaborative effort that showcased our skills and creativity. Jonathan, with his knack for coding, Katrina, with her eye for design, Prayus, with his problem-solving abilities, and Shiraz, with his project management skills, all came together to bring this website to life.
                        </p>
                        <p className="mb-6">
                        Our goal is to create a user-friendly, aesthetically pleasing, and functional web platform that not only meets the requirements of our coursework but also provides a valuable resource for anyone interested in web development. We hope you find our website informative and easy to navigate. Thank you for visiting!
                        </p>
                    </div>
            </section>
		</main>
	);
}


