// src/components/layout/DashboardLayout.jsx
import { NavLink } from "react-router-dom";
import { PlusIcon, Squares2X2Icon, ChartBarIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Navbar } from "./index"; // Make sure you have Navbar component

const DashboardLayout = ({ children }) => {
  const sidebarLinks = [
    { name: "Home", path: "/agent-dashboard", icon: HomeIcon },
    { name: "Add Lead", path: "/agent-dashboard/add-lead", icon: PlusIcon },
    { name: "My Leads", path: "/agent-dashboard/my-leads", icon: Squares2X2Icon },
    { name: "Reports", path: "/agent-dashboard/reports", icon: ChartBarIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-800 w-64 p-4 flex flex-col">
        <h2 className="text-xl font-bold text-gray-50 mb-6">Agent Panel</h2>
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-gray-200 hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 font-semibold" : ""
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-2" /> {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
