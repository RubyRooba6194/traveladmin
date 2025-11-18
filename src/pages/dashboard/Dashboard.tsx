import { useEffect, useState } from "react";
import { destinationService } from "../../services/destination.service";
import { contactService } from "../../services/contact.service";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDestinations: 0,
    totalInquiries: 0,
    newInquiries: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const destinations = await destinationService.getAll();
      const contacts = await contactService.getAll();
      const newContacts = contacts.filter((c) => c.status === "new");

      setStats({
        totalDestinations: destinations.length,
        totalInquiries: contacts.length,
        newInquiries: newContacts.length,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Destinations</h3>
          <p className="text-4xl font-bold text-blue-600">
            {stats.totalDestinations}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Inquiries</h3>
          <p className="text-4xl font-bold text-green-600">
            {stats.totalInquiries}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">New Inquiries</h3>
          <p className="text-4xl font-bold text-orange-600">
            {stats.newInquiries}
          </p>
        </div>
      </div>
    </div>
  );
};
