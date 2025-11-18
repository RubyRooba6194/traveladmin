import { ContactInquiry } from "../../types/contact.types";
import { ContactCard } from "./ContactCard";

interface ContactListProps {
  contacts: ContactInquiry[];
  onStatusChange: (id: string, status: ContactInquiry["status"]) => void;
}

export const ContactList = ({ contacts, onStatusChange }: ContactListProps) => {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No contact inquiries yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
