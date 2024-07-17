const ItemList = ({ items }) => {
	return (
		<div className="flex flex-wrap justify-center gap-6">
			{items.map((item) => (
				<div
					key={item.id}
					className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-64 flex flex-col items-center"
				>
					<div className="w-full h-48 flex items-center justify-center">
						<img
							src={item.image}
							alt={item.title}
							className="max-h-full max-w-full object-contain"
						/>
					</div>
					<h2 className="text-xl font-bold mb-2 text-center">{item.title}</h2>
					<p className="text-gray-700 mb-4 text-center">{item.description}</p>
					<p className="text-lg font-semibold text-center">{`$${item.price}`}</p>
				</div>
			))}
		</div>
	);
};

export default ItemList;
