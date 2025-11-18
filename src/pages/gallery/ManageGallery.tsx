import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/common/Modal";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { storageService } from "../../services/storage.service";
import { galleryService } from "../../services/gallery.service";
import { FiUpload, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

export const ManageGallery = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setUploading(true);

      // Upload to Firebase Storage
      const url = await storageService.uploadImage(file, "gallery");

      // Save to Firestore
      await galleryService.create({
        type: mediaType,
        url,
        title,
        description,
      });

      toast.success("Media uploaded successfully!");
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to upload media");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setPreview("");
    setMediaType("image");
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/gallery")}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <FiArrowLeft className="mr-2" />
        Back to Gallery
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Gallery</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiUpload className="mr-2" />
            Upload Media
          </button>
        </div>

        <div className="text-center py-12 text-gray-500">
          <p>Click "Upload Media" to add new gallery items</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Media"
      >
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setMediaType("image")}
              className={`flex-1 px-4 py-2 rounded-lg transition ${
                mediaType === "image"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Image
            </button>
            <button
              onClick={() => setMediaType("video")}
              className={`flex-1 px-4 py-2 rounded-lg transition ${
                mediaType === "video"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Video
            </button>
          </div>

          <Input
            label="Title"
            value={title}
            onChange={setTitle}
            placeholder="Enter media title"
          />

          <Input
            label="Description"
            value={description}
            onChange={setDescription}
            placeholder="Enter description (optional)"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select File
            </label>
            <input
              type="file"
              accept={mediaType === "image" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {preview && (
            <div className="mt-4">
              {mediaType === "image" ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={preview}
                  controls
                  className="w-full h-48 rounded-lg"
                />
              )}
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={uploading || !file}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
