import { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";

interface GalleryUploadProps {
  onUpload: (files: File[], type: "image" | "video") => Promise<void>;
}

export const GalleryUpload = ({ onUpload }: GalleryUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadType, setUploadType] = useState<"image" | "video">("image");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setUploading(true);
      await onUpload(files, uploadType);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Upload Media</h3>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setUploadType("image")}
          className={`px-4 py-2 rounded-lg transition ${
            uploadType === "image"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Images
        </button>
        <button
          onClick={() => setUploadType("video")}
          className={`px-4 py-2 rounded-lg transition ${
            uploadType === "video"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Videos
        </button>
      </div>

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition disabled:opacity-50 flex flex-col items-center"
      >
        <FiUpload className="w-12 h-12 text-gray-400 mb-2" />
        <span className="text-gray-600">
          {uploading ? "Uploading..." : `Click to upload ${uploadType}s`}
        </span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        multiple={uploadType === "image"}
        accept={uploadType === "image" ? "image/*" : "video/*"}
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
};
