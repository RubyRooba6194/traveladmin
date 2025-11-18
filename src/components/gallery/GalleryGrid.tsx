import { GalleryItem } from "../../types/gallery.types";
import { MediaCard } from "./MediaCard";

interface GalleryGridProps {
  items: GalleryItem[];
  onDelete: (id: string) => void;
}

export const GalleryGrid = ({ items, onDelete }: GalleryGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No gallery items yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
};
