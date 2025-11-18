import { useState, useEffect } from "react";
import { FiBell, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { contactService } from "../../services/contact.service";

export const Header = () => {
  const { currentUser } = useAuth();
  const [newInquiries, setNewInquiries] = useState(0);

  useEffect(() => {
    const unsubscribe = contactService.listenForNew((count) => {
      setNewInquiries(count);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, Admin!
        </h2>
        <p className="text-gray-500 text-sm">
          Manage your travel destinations and inquiries
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 transition relative">
            <FiBell className="w-6 h-6 text-gray-600" />
            {newInquiries > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {newInquiries}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center space-x-3 px-4 py-2 bg-gray-100 rounded-lg">
          <FiUser className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {currentUser?.email}
          </span>
        </div>
      </div>
    </header>
  );
};
