import { NotificationPanel } from "../../components/notifications/NotificationPanel";

export const Notifications = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <p className="text-gray-600 mt-1">
          Stay updated with new inquiries and activities
        </p>
      </div>

      <NotificationPanel />
    </div>
  );
};
