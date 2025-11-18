import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DestinationForm } from "../../components/destinations/DestinationForm";
import { destinationService } from "../../services/destination.service";
import { cloudinaryService } from "../../services/cloudinary.service";
import { DestinationFormData } from "../../types/destination.types";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

export const NewDestination = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: DestinationFormData) => {
    try {
      setLoading(true);

      // Upload images to Cloudinary
      let imageUrls: string[] = [];
      if (data.images.length > 0) {
        toast.loading("Uploading images...");
        imageUrls = await cloudinaryService.uploadMultipleImages(data.images);
        toast.dismiss();
      }

      // Create destination in Firestore
      await destinationService.create({
        name: data.name,
        region: data.region as any,
        description: data.description,
        highlights: data.highlights.filter((h) => h.trim() !== ""),
        overview: data.overview,
        images: imageUrls,
        videoUrl: data.videoUrl,
      });

      toast.success("Destination created successfully!");
      navigate("/destinations");
    } catch (error) {
      toast.error("Failed to create destination");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/destinations")}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition"
      >
        <FiArrowLeft className="mr-2" />
        Back to Destinations
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Add New Destination
        </h1>
        <DestinationForm
          onSubmit={handleSubmit}
          onCancel={() => navigate("/destinations")}
          isLoading={loading}
        />
      </div>
    </div>
  );
};
