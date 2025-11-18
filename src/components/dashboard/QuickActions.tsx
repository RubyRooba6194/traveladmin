import { useNavigate } from "react-router-dom";
import { FiPlus, FiImage, FiMap } from "react-icons/fi";

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: FiMap,
      label: "Add Destination",
      color: "blue",
      onClick: () => navigate("/destinations/new"),
    },
    {
      icon: FiImage,
      label: "Upload Gallery",
      color: "purple",
      onClick: () => navigate("/gallery"),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`p-4 rounded-lg border-2 border-dashed border-${action.color}-300 hover:bg-${action.color}-50 transition flex flex-col items-center justify-center space-y-2`}
          >
            <action.icon className={`w-8 h-8 text-${action.color}-600`} />
            <span className={`text-sm font-medium text-${action.color}-700`}>
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
