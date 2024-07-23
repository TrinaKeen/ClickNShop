

export default function Product({ name, quantity, category1, category2, image }) {
    return (
      <li className="flex justify-between items-center p-4 border-gray-700">
        <div className="flex items-center">
          <img src={image} alt={name} className="w-20 h-20 object-cover mr-10 bg-white" />
          <div>
            <span className="font-medium text-lg">{name}</span>
            <div className="text-gray-400"> {quantity} in stock</div>
          </div>
        </div>
      </li>
    );
  }