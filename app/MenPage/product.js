

export default function Product({ name, price, details, image }) {
    return (
      <li className="flex justify-between items-center p-4 border-gray-700">
        <div className="flex items-center">
          <img src={image} alt={name} className="w-20 h-20 object-cover mr-10 bg-white" />
          <div>
            <span className="font-medium text-lg">{name}</span>
            <div className="text-gray-400"> {price} Price</div>
            <div className="text-gray-400"> {details} Details</div>
          </div>
        </div>
      </li>
    );
  }