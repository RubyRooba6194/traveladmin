import { useState, useEffect } from "react";
import { contactService } from "../services/contact.service";

export const useNotifications = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = contactService.listenForNew((newCount) => {
      setCount(newCount);
    });

    return () => unsubscribe();
  }, []);

  return { count };
};
