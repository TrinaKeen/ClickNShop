export default function Item({ name, quantity, category }) {
    
    return (
      <li>
        <li className="flex justify-between items-center p-4 border-gray-700">
        <div>
        <span className="font-medium text-lg">{name}</span>
        <div className="text-gray-400">Buy {quantity} in {category}</div>
        </div>
        {/* <span className="text-gray-500 capitalize">{category}</span> */}
        </li>
      </li>
    );
  }