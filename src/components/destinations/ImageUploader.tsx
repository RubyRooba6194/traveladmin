import { useState, useRef } from "react";
import { FiUpload, FiX, FiImage } from "react-icons/fi";

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
}

export const ImageUploader = ({
  onImagesSelected,
  maxFiles = 5,
}: ImageUploaderProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);

    setFiles(newFiles);
    onImagesSelected(newFiles);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);
    onImagesSelected(newFiles);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Images (Max {maxFiles})
      </label>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ))}

        {files.length < maxFiles && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition flex flex-col items-center justify-center"
          >
            <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Upload</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
