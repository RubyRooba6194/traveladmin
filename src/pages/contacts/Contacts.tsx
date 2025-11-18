import { useState } from "react";
import { useContacts } from "../../hooks/useContacts";
import { ContactList } from "../../components/contacts/ContactList";
import { SearchBar } from "../../components/common/SearchBar";
import { Loader } from "../../components/common/Loader";
import { contactService } from "../../services/contact.service";
import { ContactInquiry } from "../../types/contact.types";
import toast from "react-hot-toast";

export const Contacts = () => {
  const { contacts, loading, refetch } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | ContactInquiry["status"]
  >("all");

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (
    id: string,
    status: ContactInquiry["status"]
  ) => {
    try {
      await contactService.updateStatus(id, status);
      toast.success("Status updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Contact Inquiries</h1>
        <p className="text-gray-600 mt-1">
          Manage customer inquiries and messages
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name or email..."
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
          </select>
        </div>
      </div>

      <ContactList
        contacts={filteredContacts}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
