import { useState, useEffect } from "react";
import { destinationService } from "../services/destination.service";
import { Destination } from "../types/destination.types";

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await destinationService.getAll();
      setDestinations(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch destinations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return { destinations, loading, error, refetch: fetchDestinations };
};
