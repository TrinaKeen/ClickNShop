import React from 'react';

const ItemList = ({ items, onItemClick }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
			{items.map((item) => (
				<div
					key={item.id}
					className="bg-white p-6 rounded-lg shadow-md cursor-pointer flex flex-col"
					onClick={() => onItemClick(item)}
					style={{ width: '250px', height: '600px' }}
				>
					<img
						src={item.image}
						alt={item.title}
						style={{ width: '300px', height: '300px', objectFit: 'contain' }} // Fixed image size
						className="mb-4"
					/>
					<div className="flex flex-col flex-grow">
						<h2 className="text-xl font-bold mb-2">{item.title}</h2>
						<p className="font-bold text-xl mt-auto">${item.price}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default ItemList;
