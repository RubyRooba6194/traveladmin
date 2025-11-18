// import { useState } from "react";
// import { useGallery } from "../../hooks/useGallery";
// import { GalleryGrid } from "../../components/gallery/GalleryGrid";
// import { GalleryUpload } from "../../components/gallery/GalleryUpload";
// import { Loader } from "../../components/common/Loader";
// import { storageService } from "../../services/storage.service";
// import { galleryService } from "../../services/gallery.service";
// import toast from "react-hot-toast";

// export const Gallery = () => {
//   const { items, loading, refetch } = useGallery();
//   const [filterType, setFilterType] = useState<"all" | "image" | "video">(
//     "all"
//   );

//   const filteredItems = items.filter(
//     (item) => filterType === "all" || item.type === filterType
//   );

//   const handleUpload = async (files: File[], type: "image" | "video") => {
//     try {
//       const uploadPromises = files.map(async (file) => {
//         const url = await storageService.uploadImage(file, "gallery");
//         return galleryService.create({
//           type,
//           url,
//           title: file.name,
//         });
//       });

//       await Promise.all(uploadPromises);
//       toast.success("Files uploaded successfully!");
//       refetch();
//     } catch (error) {
//       toast.error("Failed to upload files");
//       console.error(error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;

//     try {
//       await galleryService.delete(id);
//       toast.success("Item deleted successfully");
//       refetch();
//     } catch (error) {
//       toast.error("Failed to delete item");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Gallery Management</h1>
//         <p className="text-gray-600 mt-1">
//           Upload and manage your gallery items
//         </p>
//       </div>

//       <GalleryUpload onUpload={handleUpload} />

//       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setFilterType("all")}
//             className={`px-4 py-2 rounded-lg transition ${
//               filterType === "all"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilterType("image")}
//             className={`px-4 py-2 rounded-lg transition ${
//               filterType === "image"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Images
//           </button>
//           <button
//             onClick={() => setFilterType("video")}
//             className={`px-4 py-2 rounded-lg transition ${
//               filterType === "video"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Videos
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : (
//         <GalleryGrid items={filteredItems} onDelete={handleDelete} />
//       )}
//     </div>
//   );
// };



import { useState } from "react";
import { useGallery } from "../../hooks/useGallery";
import { GalleryGrid } from "../../components/gallery/GalleryGrid";
import { GalleryUpload } from "../../components/gallery/GalleryUpload";
import { Loader } from "../../components/common/Loader";
import { cloudinaryService } from "../../services/cloudinary.service"; // NEW
import { galleryService } from "../../services/gallery.service";
import toast from "react-hot-toast";

export const Gallery = () => {
  const { items, loading, refetch } = useGallery();
  const [filterType, setFilterType] = useState<"all" | "image" | "video">(
    "all"
  );

  const filteredItems = items.filter(
    (item) => filterType === "all" || item.type === filterType
  );

  const handleUpload = async (files: File[], type: "image" | "video") => {
    try {
      toast.loading("Uploading files...");

      const uploadPromises = files.map(async (file) => {
        const url = await cloudinaryService.uploadImage(file);
        return galleryService.create({
          type,
          url,
          title: file.name,
        });
      });

      await Promise.all(uploadPromises);
      toast.dismiss();
      toast.success("Files uploaded successfully!");
      refetch();
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to upload files");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await galleryService.delete(id);
      toast.success("Item deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete item");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gallery Management</h1>
        <p className="text-gray-600 mt-1">
          Upload and manage your gallery items
        </p>
      </div>

      <GalleryUpload onUpload={handleUpload} />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-lg transition ${
              filterType === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType("image")}
            className={`px-4 py-2 rounded-lg transition ${
              filterType === "image"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setFilterType("video")}
            className={`px-4 py-2 rounded-lg transition ${
              filterType === "video"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Videos
          </button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <GalleryGrid items={filteredItems} onDelete={handleDelete} />
      )}
    </div>
  );
};

