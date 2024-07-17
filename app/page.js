import Link from "next/link";

export default function Home() {
	return (
		<main>
			<h1>Home Page</h1>
			<ul>
				<li>
					<Link href="./Item-page/pages/">Item Page</Link>
				</li>
			</ul>
		</main>
	);
}
