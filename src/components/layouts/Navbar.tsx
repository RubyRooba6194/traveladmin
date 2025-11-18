import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiMap,
  FiImage,
  FiMail,
  FiBell,
  FiUser,
  FiSettings,
} from "react-icons/fi";

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/destinations", icon: FiMap, label: "Destinations" },
    { path: "/gallery", icon: FiImage, label: "Gallery" },
    { path: "/contacts", icon: FiMail, label: "Contacts" },
    { path: "/notifications", icon: FiBell, label: "Notifications" },
    { path: "/admin", icon: FiUser, label: "Admin" },
    { path: "/settings", icon: FiSettings, label: "Settings" },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold text-gray-800">Varsha Travel</h1>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
