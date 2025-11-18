import { GalleryItem } from "../../types/gallery.types";
import { FiTrash2, FiPlay } from "react-icons/fi";

interface MediaCardProps {
  item: GalleryItem;
  onDelete: () => void;
}

export const MediaCard = ({ item, onDelete }: MediaCardProps) => {
  return (
    <div className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      {item.type === "image" ? (
        <img
          src={item.url}
          alt={item.title || "Gallery item"}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="relative">
          <video src={item.url} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <FiPlay className="w-12 h-12 text-white" />
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <button
          onClick={onDelete}
          className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>

      {item.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-white text-sm font-medium">{item.title}</p>
        </div>
      )}
    </div>
  );
};
