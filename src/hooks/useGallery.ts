import { useState, useEffect } from "react";
import { galleryService } from "../services/gallery.service";
import { GalleryItem } from "../types/gallery.types";

export const useGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await galleryService.getAll();
      setItems(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch gallery items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return { items, loading, error, refetch: fetchGallery };
};
