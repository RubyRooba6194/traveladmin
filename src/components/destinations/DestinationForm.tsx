import { useState } from "react";
import { DestinationFormData } from "../../types/destination.types";
import { ImageUploader } from "./ImageUploader";
import { FiSave, FiX } from "react-icons/fi";

interface DestinationFormProps {
  initialData?: Partial<DestinationFormData>;
  onSubmit: (data: DestinationFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DestinationForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: DestinationFormProps) => {
  const [formData, setFormData] = useState<DestinationFormData>({
    name: initialData?.name || "",
    region: initialData?.region || "Theni",
    description: initialData?.description || "",
    highlights: initialData?.highlights || [""],
    overview: initialData?.overview || "",
    images: [],
    videoUrl: initialData?.videoUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, ""],
    });
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Destination Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Region
          </label>
          <select
            value={formData.region}
            onChange={(e) =>
              setFormData({ ...formData, region: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="Theni">Theni</option>
            <option value="Madurai">Madurai</option>
            <option value="Kerala">Kerala</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Overview
        </label>
        <textarea
          value={formData.overview}
          onChange={(e) =>
            setFormData({ ...formData, overview: e.target.value })
          }
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Highlights
        </label>
        {formData.highlights.map((highlight, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={highlight}
              onChange={(e) => updateHighlight(index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter highlight"
            />
            <button
              type="button"
              onClick={() => removeHighlight(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addHighlight}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          + Add Highlight
        </button>
      </div>

      <ImageUploader
        onImagesSelected={(files) =>
          setFormData({ ...formData, images: files })
        }
        maxFiles={5}
      />

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Video URL (Optional)
        </label>
        <input
          type="url"
          value={formData.videoUrl}
          onChange={(e) =>
            setFormData({ ...formData, videoUrl: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center"
        >
          <FiSave className="mr-2" />
          {isLoading ? "Saving..." : "Save Destination"}
        </button>
      </div>
    </form>
  );
};
