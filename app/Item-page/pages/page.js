"use client";
import { useEffect, useState } from "react";
import ItemList from "../components/ItemList";

const ItemPage = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch("https://fakestoreapi.com/products");
			const data = await response.json();
			setItems(data);
		};

		fetchProducts();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<h1 className="text-4xl font-bold text-center mb-8">
				Fake Store Products
			</h1>
			<ItemList items={items} />
		</div>
	);
};

export default ItemPage;
