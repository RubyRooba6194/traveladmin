import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: "blue" | "green" | "orange" | "purple";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = ({
  title,
  value,
  icon,
  color,
  trend,
}: StatsCardProps) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className={`h-2 bg-gradient-to-r ${colorClasses[color]}`}></div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
            {trend && (
              <p
                className={`text-sm mt-2 ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}% from last month
              </p>
            )}
          </div>
          <div
            className={`p-4 rounded-full bg-gradient-to-r ${colorClasses[color]}`}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};
