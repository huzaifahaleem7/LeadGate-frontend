// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext.jsx";
import {
  HomeIcon,
  PlusIcon,
  Squares2X2Icon,
  ChartBarIcon,
  CheckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null; // hide sidebar if no user

  // Centralized links config
  const linksConfig = {
    agent: [
      { name: "Home", icon: HomeIcon, path: "/agent-dashboard" },
      { name: "Add Lead", icon: PlusIcon, path: "/agent-dashboard/add-lead" },
      { name: "My Leads", icon: Squares2X2Icon, path: "/agent-dashboard/my-leads" },
      { name: "Reports", icon: ChartBarIcon, path: "/agent-dashboard/reports" },
    ],
    teamlead: [
      { name: "Home", icon: HomeIcon, path: "/teamlead-dashboard" },
      { name: "Approve Leads", icon: CheckIcon, path: "/teamlead-dashboard/approve-leads" },
      { name: "Reports", icon: ChartBarIcon, path: "/teamlead-dashboard/reports" },
    ],
    admin: [
      { name: "Home", icon: HomeIcon, path: "/admin-dashboard" },
      { name: "User Management", icon: UsersIcon, path: "/admin-dashboard/users" },
      { name: "Reports", icon: ChartBarIcon, path: "/admin-dashboard/reports" },
    ],
  };

  const roleLinks = linksConfig[user.role] || [];

  return (
    <aside className="bg-gray-900 text-gray-300 w-64 flex-none flex flex-col space-y-6 py-7 px-2 fixed top-0 left-0 h-screen overflow-y-auto">
      {/* Logo */}
      <Link
        to={`/${user.role}-dashboard`}
        className="text-white flex items-center space-x-2 px-4 cursor-pointer"
      >
        <HomeIcon className="w-6 h-6" />
        <span className="text-2xl font-bold">LeadGate</span>
      </Link>

      {/* Navigation */}
      <nav className="mt-10 flex-1">
        {roleLinks.map(({ name, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className={`flex items-center px-4 py-2 my-1 rounded-md transition-colors duration-200 cursor-pointer ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon
                className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-gray-300"}`}
              />
              <span className="font-medium">{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
