import { useState, useEffect } from "react";
import { contactService } from "../../services/contact.service";
import { ContactInquiry } from "../../types/contact.types";
import { FiMail, FiClock } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

export const RecentInquiries = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await contactService.getAll();
        setInquiries(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  if (loading) {
    return <div className="bg-white rounded-xl shadow-lg p-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <FiMail className="mr-2" />
        Recent Inquiries
      </h3>

      <div className="space-y-3">
        {inquiries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No inquiries yet</p>
        ) : (
          inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">{inquiry.name}</p>
                  <p className="text-sm text-gray-600">{inquiry.email}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {inquiry.message}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    inquiry.status === "new"
                      ? "bg-green-100 text-green-700"
                      : inquiry.status === "read"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {inquiry.status}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-400 mt-2">
                <FiClock className="mr-1" />
                {formatDistanceToNow(inquiry.createdAt, { addSuffix: true })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
