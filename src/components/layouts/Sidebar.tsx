import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiMap,
  FiImage,
  FiMail,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/destinations", icon: FiMap, label: "Destinations" },
    { path: "/gallery", icon: FiImage, label: "Gallery" },
    { path: "/contacts", icon: FiMail, label: "Contacts" },
    { path: "/notifications", icon: FiBell, label: "Notifications" },
    { path: "/admin", icon: FiUser, label: "Admin Management" },
    { path: "/settings", icon: FiSettings, label: "Settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold">Varsha Travel</h1>
        <p className="text-blue-200 text-sm mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? "bg-blue-600 shadow-lg"
                : "hover:bg-blue-700/50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-700">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg hover:bg-red-600/20 transition-all duration-200 text-red-300 hover:text-red-200"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
