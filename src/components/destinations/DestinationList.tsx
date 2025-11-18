import { Destination } from "../../types/destination.types";
import { DestinationCard } from "./DestinationCard";

interface DestinationListProps {
  destinations: Destination[];
  onEdit: (destination: Destination) => void;
  onDelete: (id: string) => void;
}

export const DestinationList = ({
  destinations,
  onEdit,
  onDelete,
}: DestinationListProps) => {
  if (destinations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No destinations found</p>
        <p className="text-gray-400 text-sm mt-2">
          Add your first destination to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          onEdit={() => onEdit(destination)}
          onDelete={() => onDelete(destination.id)}
        />
      ))}
    </div>
  );
};
