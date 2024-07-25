import { useState } from "react";

const ItemList = ({ items }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleItemClick = (id) => {
    setSelectedItemId(id === selectedItemId ? null : id);
  };

  return (
    <div className="overflow-x-auto whitespace-nowrap p-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`inline-block bg-white p-4 m-2 rounded-lg shadow-md hover:shadow-lg transition-shadow w-64 cursor-pointer item-container ${selectedItemId === item.id ? "h-auto" : ""}`}
          onClick={() => handleItemClick(item.id)}
          style={{ whiteSpace: "normal" }}
        >
          <div className="w-full h-48 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <h2 className="text-xl font-bold mb-2 text-center">{item.title}</h2>
          <p className="text-lg font-semibold text-center">{`$${item.price}`}</p>
          {selectedItemId === item.id && (
            <p className="description text-gray-700 mt-4 text-center">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
