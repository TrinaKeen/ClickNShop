import Link from "next/link";

export default function AboutPage() {
	return (
		<main className="bg-white py-6 text-black">
			<header className="container mx-auto flex justify-between items-center">
				<img src="/logo2.jpg" alt="ClickNShop Logo" className="h-20" />
				<nav>
				<ul className="flex space-x-8 text-lg text-black">
					<li className="hover:underline"><Link href="../">Home</Link></li>
					<li className="hover:underline"><Link href="./Men-page/">Men</Link></li>
					<li className="hover:underline"><Link href="./Women-page/">Women</Link></li>
					
					<li className="hover:underline"><Link href="./About-page/">About</Link></li>
					<li>
					<form className="flex items-center">
						<input type="text" className="border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Search..."/>
						<button type="submit" className="bg-gray-300 text-white p-1 rounded-r-md hover:bg-blue-700">Search</button>
					</form>
					</li>
					<li className="hover:underline"><Link href="./LogIn/">Login</Link></li>
				</ul>
				</nav>
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

