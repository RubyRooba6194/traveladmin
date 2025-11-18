import { Destination } from "../../types/destination.types";
import { FiEdit2, FiTrash2, FiMapPin } from "react-icons/fi";

interface DestinationCardProps {
  destination: Destination;
  onEdit: () => void;
  onDelete: () => void;
}

export const DestinationCard = ({
  destination,
  onEdit,
  onDelete,
}: DestinationCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.images[0] || "/placeholder.jpg"}
          alt={destination.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={onEdit}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition"
          >
            <FiEdit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition"
          >
            <FiTrash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">
            {destination.name}
          </h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
            {destination.region}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {destination.description}
        </p>

        <div className="flex items-center text-gray-500 text-sm">
          <FiMapPin className="w-4 h-4 mr-1" />
          <span>{destination.highlights.length} highlights</span>
        </div>
      </div>
    </div>
  );
};
