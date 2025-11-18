import { ContactInquiry } from "../../types/contact.types";
import { FiMail, FiPhone, FiClock } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

interface ContactCardProps {
  contact: ContactInquiry;
  onStatusChange: (id: string, status: ContactInquiry["status"]) => void;
}

export const ContactCard = ({ contact, onStatusChange }: ContactCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{contact.name}</h3>
          <div className="flex items-center text-gray-600 mt-2 space-x-4">
            <div className="flex items-center">
              <FiMail className="mr-2" />
              <span className="text-sm">{contact.email}</span>
            </div>
            <div className="flex items-center">
              <FiPhone className="mr-2" />
              <span className="text-sm">{contact.phone}</span>
            </div>
          </div>
        </div>

        <select
          value={contact.status}
          onChange={(e) =>
            onStatusChange(
              contact.id,
              e.target.value as ContactInquiry["status"]
            )
          }
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            contact.status === "new"
              ? "bg-green-100 text-green-700"
              : contact.status === "read"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="responded">Responded</option>
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-3">
        <p className="text-gray-700">{contact.message}</p>
      </div>

      <div className="flex items-center text-gray-400 text-sm">
        <FiClock className="mr-1" />
        {formatDistanceToNow(contact.createdAt, { addSuffix: true })}
      </div>
    </div>
  );
};
