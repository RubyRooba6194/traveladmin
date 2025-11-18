import { useState, useEffect } from "react";
import { contactService } from "../../services/contact.service";

export const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const contacts = await contactService.getAll();
      const newContacts = contacts.filter((c) => c.status === "new");
      setNotifications(newContacts);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded"
            >
              <p className="font-semibold">
                New inquiry from {notification.name}
              </p>
              <p className="text-sm text-gray-600">{notification.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
