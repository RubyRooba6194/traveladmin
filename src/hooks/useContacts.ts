import { useState, useEffect } from "react";
import { contactService } from "../services/contact.service";
import { ContactInquiry } from "../types/contact.types";

export const useContacts = () => {
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAll();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch contacts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return { contacts, loading, error, refetch: fetchContacts };
};
