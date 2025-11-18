import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DestinationForm } from "../../components/destinations/DestinationForm";
import { destinationService } from "../../services/destination.service";
import { cloudinaryService } from "../../services/cloudinary.service";
import {
  Destination,
  DestinationFormData,
} from "../../types/destination.types";
import { Loader } from "../../components/common/Loader";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

export const EditDestination = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDestination = async () => {
      if (!id) return;

      try {
        const data = await destinationService.getById(id);
        setDestination(data);
      } catch (error) {
        toast.error("Failed to load destination");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  const handleSubmit = async (data: DestinationFormData) => {
    if (!id) return;

    try {
      setSaving(true);

      // Keep existing images
      let imageUrls = destination?.images || [];

      // Upload new images if any
      if (data.images.length > 0) {
        toast.loading("Uploading new images...");
        const newImageUrls = await cloudinaryService.uploadMultipleImages(
          data.images
        );
        toast.dismiss();
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      // Update destination in Firestore
      await destinationService.update(id, {
        name: data.name,
        region: data.region as any,
        description: data.description,
        highlights: data.highlights.filter((h) => h.trim() !== ""),
        overview: data.overview,
        images: imageUrls,
        videoUrl: data.videoUrl,
      });

      toast.success("Destination updated successfully!");
      navigate("/destinations");
    } catch (error) {
      toast.error("Failed to update destination");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  if (!destination) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Destination not found</p>
          <button
            onClick={() => navigate("/destinations")}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Go back to destinations
          </button>
        </div>
      </div>
    );
  }

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
          Edit Destination
        </h1>
        <DestinationForm
          initialData={destination}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/destinations")}
          isLoading={saving}
        />
      </div>
    </div>
  );
};
