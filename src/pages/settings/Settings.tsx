import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FiMoon, FiSun, FiBell, FiMail } from "react-icons/fi";
import toast from "react-hot-toast";

export const Settings = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleToggleEmail = () => {
    setEmailNotifications(!emailNotifications);
    toast.success(
      emailNotifications
        ? "Email notifications disabled"
        : "Email notifications enabled"
    );
  };

  const handleTogglePush = () => {
    setPushNotifications(!pushNotifications);
    toast.success(
      pushNotifications
        ? "Push notifications disabled"
        : "Push notifications enabled"
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">
          Customize your admin panel preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            {isDark ? (
              <FiMoon className="mr-2 text-purple-600" />
            ) : (
              <FiSun className="mr-2 text-yellow-600" />
            )}
            Appearance
          </h2>

          <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <div
                className={`p-3 rounded-full mr-4 ${
                  isDark ? "bg-gray-700" : "bg-yellow-100"
                }`}
              >
                {isDark ? (
                  <FiMoon className="w-6 h-6 text-blue-400" />
                ) : (
                  <FiSun className="w-6 h-6 text-yellow-600" />
                )}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Theme Mode</p>
                <p className="text-sm text-gray-600">
                  {isDark
                    ? "🌙 Dark mode is active"
                    : "☀️ Light mode is active"}
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDark}
                onChange={toggleTheme}
                className="sr-only peer"
              />
              <div className="w-16 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-purple-600 shadow-inner"></div>
            </label>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>💡 Note:</strong> Dark mode is currently in beta. Full
              dark theme support coming soon!
            </p>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FiBell className="mr-2 text-blue-600" />
            Notifications
          </h2>

          <div className="space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="flex items-center">
                <div
                  className={`p-3 rounded-full mr-4 ${
                    emailNotifications ? "bg-blue-100" : "bg-gray-200"
                  }`}
                >
                  <FiMail
                    className={`w-5 h-5 ${
                      emailNotifications ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-600">
                    Receive email alerts for new inquiries
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={handleToggleEmail}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="flex items-center">
                <div
                  className={`p-3 rounded-full mr-4 ${
                    pushNotifications ? "bg-green-100" : "bg-gray-200"
                  }`}
                >
                  <FiBell
                    className={`w-5 h-5 ${
                      pushNotifications ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Push Notifications</p>
                  <p className="text-sm text-gray-600">
                    Receive browser push notifications
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={handleTogglePush}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
